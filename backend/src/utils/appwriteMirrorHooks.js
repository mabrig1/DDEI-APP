/**
 * Attaches Appwrite mirroring to a Mongoose schema.
 *
 * Wiring the mirror at the model layer means every write path is covered by one
 * change per model — no controller has to remember to call the backup, and a
 * new controller gets mirroring for free.
 *
 * The hooks are deliberately fire-and-forget: they schedule the mirror and
 * return synchronously, so a slow or unreachable Appwrite never adds latency to
 * a user request. Anything they miss (bulk `updateMany`, direct driver writes)
 * is picked up by the periodic incremental sync in server.js.
 */

const { mirrorDoc, mirrorDelete } = require('./appwriteBackup');

function attachAppwriteMirror(schema, modelName) {
  // .save() and .create()
  schema.post('save', function mirrorOnSave(doc) {
    mirrorDoc(modelName, doc);
  });

  schema.post('insertMany', function mirrorOnInsertMany(docs) {
    for (const doc of docs || []) mirrorDoc(modelName, doc);
  });

  // findByIdAndUpdate / findOneAndUpdate / findOneAndReplace.
  //
  // Several call sites omit `{ new: true }`, so the document handed to this
  // hook is the *pre-update* one. Re-reading by ID guarantees the backup gets
  // the state that actually landed rather than the state we replaced.
  schema.post(['findOneAndUpdate', 'findOneAndReplace'], function mirrorOnFindOneAndUpdate(doc) {
    if (!doc || !doc._id) return;
    const model = this.model;
    model
      .findById(doc._id)
      .then((fresh) => {
        if (fresh) mirrorDoc(modelName, fresh);
        else mirrorDelete(modelName, doc._id);
      })
      .catch(() => {
        // Mirroring must never surface as a request error. The periodic sync
        // reconciles anything lost here.
      });
  });

  // findByIdAndDelete / findOneAndDelete
  schema.post('findOneAndDelete', function mirrorOnDelete(doc) {
    if (doc && doc._id) mirrorDelete(modelName, doc._id);
  });

  // doc.deleteOne()
  schema.post('deleteOne', { document: true, query: false }, function mirrorOnDocDelete() {
    if (this._id) mirrorDelete(modelName, this._id);
  });
}

module.exports = { attachAppwriteMirror };
