"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const guests_1 = __importDefault(require("./routes/guests"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/guests", guests_1.default);
// app.listen(process.env.PORT || 4000, () =>
//   console.log(`API ready at http://localhost:${process.env.PORT || 4000}`)
// );
if (require.main === module) { // only run when not in tests
    exports.app.listen(process.env.PORT || 4000, () => console.log(`API ready at http://localhost:${process.env.PORT || 4000}`));
}
