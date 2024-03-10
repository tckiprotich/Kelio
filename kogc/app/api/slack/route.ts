// @ts-nocheck
import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";

const slackToken = "xoxb-4062228885045-6772983115746-yQm8hzTPopH2y153YrTdG0jA";
const client = new WebClient(slackToken);

const channelId = "C041QH2CL06";
const userEmails = ["tckiprotich@gmail.com"]; // Replace with the actual emails

export async function POST(req: Request) {
    const body = await req.json();
    console.log("Request body:", body);
    const inviteResults = []; // Array to store the results of each invitation

    for (const email of userEmails) {
        try {
            // Get the user ID from the email
            const lookupResult = await client.users.lookupByEmail({ email });
            if (!lookupResult.ok) {
                console.error(`Failed to lookup user by email ${email}: ${lookupResult.error}`);
                inviteResults.push({ email, success: false, error: lookupResult.error });
                continue;
            }

            // Extract the userId from the lookupResult
            const userId = lookupResult.user.id;

            // Invite the user to the channel
            const inviteResult = await client.conversations.invite({
                channel: channelId,
                users: userId,
            });

            if (inviteResult.ok) {
                console.log(`User ${email} invited to channel successfully`);
                inviteResults.push({ email, success: true });
            } else {
                console.error(`Failed to invite user ${email} to channel: ${inviteResult.error}`);
                inviteResults.push({ email, success: false, error: inviteResult.error });
            }
        } catch (error) {
            console.error(`Error inviting user ${email} to channel: ${error.message}`);
            inviteResults.push({ email, success: false, error: error.message });
        }
    }

    // Get the list of members in the channel
    const membersResult = await client.conversations.members({ channel: channelId });
    if (!membersResult.ok) {
        console.error(`Failed to fetch members of channel: ${membersResult.error}`);
        return NextResponse.json({ success: false, error: membersResult.error });
    }

    console.log(`Fetched members of channel successfully`, membersResult.members);

    return NextResponse.json({ success: true, inviteResults, members: membersResult.members });
}