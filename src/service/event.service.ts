import * as fs from "node:fs";
import path from "node:path";
import {logger} from "../utils/logger";

export class GitHubEvent {
    private directory!: string;
    private filename!: string;
    private filePath!: string;

    constructor(directory:string, filename: string) {
        this.filename = filename + ".md";
        this.directory = directory;

        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }

        this.filePath = this.createFile();
    }

    private createFile() {
        logger.info("Creating new file");

        const filePath = path.join(this.directory, this.filename);

        logger.info("File path:", filePath);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "", 'utf8');
        }

        return filePath;
    }

    public appendContent(content: string) {
        logger.info("Appending new content into file path: " + this.filePath);

        if (!fs.existsSync(this.filePath)) {
            this.createFile();
        }

        fs.appendFileSync(this.filePath, `\n\n${content}\n\n`, 'utf8');
    }

    public getFile(): string {return this.directory! + "/" + this.filename!}

    private readFile(filePath: string) {

        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }

        return null;
    }
}
