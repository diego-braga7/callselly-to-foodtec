"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddErrorStatusToOrder1730724934631 = void 0;
class AddErrorStatusToOrder1730724934631 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TYPE "public"."order_status_enum" ADD VALUE 'error'
          `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
            CREATE TYPE "public"."order_status_enum_old" AS ENUM ('pending', 'completed', 'cancelled');
            ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::text::"public"."order_status_enum_old";
            DROP TYPE "public"."order_status_enum";
            ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum";
            ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';
          `);
        });
    }
}
exports.AddErrorStatusToOrder1730724934631 = AddErrorStatusToOrder1730724934631;
