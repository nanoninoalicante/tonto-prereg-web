import { useCookies } from "h3";
import * as uuid from "uuid";
import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: "https://global-leading-maggot-30506.upstash.io",
  token:
    "AXcqASQgZTZmODdlNzctNmIyMC00NGU2LWJlNDctOWE4ZDk5MGMzMmE3NGM5NTU5OGJjNmI5NDlkNjgyMTNkNDMyNmVhMzY2NzU=",
});
export default defineEventHandler(async (event) => {
  console.log("New request: " + event.req.url);
  const cookies = useCookies(event);
  console.log("cookies: ", cookies.session);
  if (!cookies.session) {
    const sessionId = uuid.v4();
    setCookie(event, "session", sessionId);
    await redis.set(sessionId, JSON.stringify({ id: sessionId }));
  } else {
    // get session data from redis
    const session = await redis.get(cookies.session);
    console.log("get session: ", session);
  }
});
