import mongoose from "mongoose";

const TrainingDataSchema = new mongoose.Schema({
    fundName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    orgId: {
        type: String,
        required: true
    },
    dynamicfields: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

export default mongoose.models.TrainingData || mongoose.model('TrainingData', TrainingDataSchema);