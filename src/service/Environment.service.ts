import dotenv from "dotenv";

dotenv.config();

export class ConfigService {
    private static _instance: ConfigService;

    private _email_user!: string;
    private _email_password!: string;
    private _email_recipient!: string;
    private _email_recipient_name!: string;
    private _email_subject!: string;
    private _directory_name!: string;
    private _file_name!: string;
    private _github_repo_url!: string;
    private readonly _github_token: string;

    private constructor() {
        this._email_user = process.env.EMAIL_USER || "";
        this._email_password = process.env.EMAIL_PASS || "";
        this._email_recipient = process.env.EMAIL_RECP || "";
        this._email_recipient_name = process.env.EMAIL_RECP_NAME || process.env.EMAIL_RECP_DEFAULT || "norecipient@gmail.com";
        this._email_subject = process.env.SUBJECT || "GitHub Actions - Automated Email (TypeScript)";
        this._directory_name = process.env.DIRECTORY_NAME || "";
        this._file_name = process.env.FILE_NAME || "";
        this._github_repo_url = process.env.GITHUB_REPO || "";
        this._github_token = process.env.GITHUB_TOKEN || "No token"
    }

    // Singleton pattern: access globally
    public static get instance(): ConfigService {
        if (!this._instance) {
            this._instance = new ConfigService();
        }
        return this._instance;
    }

    public get userEmail(): string {return this._email_user;}
    public get userPassword(): string {return this._email_password;}
    public get emailRecipient(): string {return this._email_recipient;}
    public get emailRecipientName(): string {return this._email_recipient_name;}
    public get emailSubject(): string {return this._email_subject;}
    public get directoryName(): string {return this._directory_name;}
    public get fileName(): string {return this._file_name;}
    public get gitHubUrl(): string {console.log(this._github_repo_url); return this._github_repo_url;}
    public get githubToken(): string {console.log(this._github_token);return this._github_token}
}