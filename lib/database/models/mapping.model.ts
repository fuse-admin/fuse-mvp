import { Schema, model, models } from "mongoose";

export interface IMapping {
    _id: string;
    fundName: string;
    fundId: string;
    fundMapping: string;
    documentUrl: string;
    organization: string;
}

const MappingSchema = new Schema({
    fundName: {type: String, required: true},
    fundId: {type: String, required: true},
    fundMapping: {type: String, required: true},
    documentUrl: {type: String, required: true},
    organization: {type: String, required: true},
});

const Mapping = models.Mapping || model('Mapping', MappingSchema);

export default Mapping;