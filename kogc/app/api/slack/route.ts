// @ts-nocheck
import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";

const slackToken = process.env.SLACK_BOT_TOKEN;
const client = new WebClient(slackToken);

const channelId = "C041QH2CL06";
const userEmails = ["keliosharon@gmail.com"]; // Replace with the actual emails

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
            console.log(`User ID for ${email}: ${userId}`);

            // Get the list of members in the channel
            const membersResult = await client.conversations.members({ channel: channelId });
            if (!membersResult.ok) {
                console.error(`Failed to fetch members of channel: ${membersResult.error}`);
                inviteResults.push({ email, success: false, error: membersResult.error });
                continue;
            }

            // Check if the user is a member of the channel
            if (membersResult.members.includes(userId)) {
                console.log(`User ${email} is already in the channel`);
                inviteResults.push({ email, success: true });
            } else {
                // The user is not in the channel, invite them to the channel
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
            }
        } catch (error) {
            console.error(`Error inviting user ${email} to channel: ${error.message}`);
            inviteResults.push({ email, success: false, error: error.message });
        }
    }

    return NextResponse.json({ success: true, inviteResults });
}