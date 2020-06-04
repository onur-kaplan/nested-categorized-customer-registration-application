import { eventsVictim } from "./src/views/eventsVictim";
import { eventsCustomer} from "./src/views/eventsCustomer";
import {Initialize} from "./src/models/initialize";

eventsCustomer();
eventsVictim();

let start = new Initialize()

start.init()
