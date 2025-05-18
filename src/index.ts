import {TaskService} from "./service/task.service";
import {logger} from "./utils/logger";
import {GitHubEvent} from "./service/event.service";
import {ConfigService} from "./service/Environment.service";
import {Event} from "./models/event";

// Initialize instance
const instance = ConfigService.instance;

// Define folder and filenames here or get them from somewhere
let directory: string = instance.directoryName;
let filename: string = instance.fileName;
let githubURL: string = instance.gitHubUrl;
let event!: Event;
let link: string;

const eventService = new GitHubEvent(directory, filename);

link =  githubURL + eventService.getFile();

// Send an email about today's random action.
const taskService = new TaskService("Ian", "Company", "en-KE", link);

taskService
    .send()
    .then(serviceResponse => {
        if (serviceResponse.success) {
            logger.info(serviceResponse.message);
        }
        else {
            logger.error(serviceResponse.message);
        }
    })
    .catch(error => {
        logger.error("An error occurred while sending an email.");
        logger.error(error);
    })
    .finally(() =>
        // TODO: send this event to the logs records
        logger.info("Finished...")
    );

// Fetch the selected event details
logger.info("Fetching selected event details...");
event = taskService.getEvent();

// Create a .md file and record this as a GitHub activity
logger.info("Writing event details into an md file...");
eventService.appendContent(`# Activity: ${event.task}`);
