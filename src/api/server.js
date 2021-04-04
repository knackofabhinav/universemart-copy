import {createServer} from "miragejs";
import {productlist} from "./Products"

export function setupMockServer() {
    createServer({
        routes() {
            this.namespace = "api";
            this.get("/productlist", () => {
                return {productlist};
            });
        }
    });
}