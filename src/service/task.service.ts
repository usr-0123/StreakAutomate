import {DateFormatter} from "../utils/datetime";
import {NodemailerParameters} from "../models/nodemailer.request";
import {sendEmailService} from "./nodemailer.service";
import activities from "../data/activities.json";

export class TaskService {
    private dateFormatter: DateFormatter;
    private name: string;
    private companyName: string;
    private timezone: string;
    private activity!: {task: string, link: string};

    constructor(name: string, companyName: string = "GitHub Stories", timezone: string = "en-US", link: string) {
        this.dateFormatter = new DateFormatter(new Date());
        this.name = name;
        this.companyName = companyName;
        this.timezone = timezone;
        this.getRandomActivity();
        this.activity.link = link;
    }

    private getRandomActivity() {
        const index = Math.floor(Math.random() * activities.length);
        this.activity = activities[index];
    }

    private buildEmailParams(): NodemailerParameters {
        const selectedActivity = this.activity;

        return {
            activity: selectedActivity.task,
            activityLink: selectedActivity.link,
            name: this.name,
            companyName: this.companyName,
            time: this.dateFormatter.format("YYYY-MM-DD HH:mm:ss"),
            timezone: this.dateFormatter.formatLocale(this.timezone),
        };
    }

    public send() {
        const parameters = this.buildEmailParams();
        return sendEmailService(parameters);
    }

    public getEvent() {
        return this.activity;
    }
    
}