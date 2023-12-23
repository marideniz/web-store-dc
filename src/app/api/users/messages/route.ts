import {connect} from "@/db/db";
import Messages from "@/models/messageModel";
import {NextRequest, NextResponse} from "next/server";
connect()


export async function GET(request: NextRequest) {
    try {
        const allMessages = await Messages.find({});
        return NextResponse.json({
            message: "All Messages retrieved successfully",
            messages: allMessages
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {title, message, category, authorsContact, createdAt} = reqBody
        const newMessage = new Messages({title, message, category, authorsContact, createdAt});
        const savedMessage = await newMessage.save()
        return NextResponse.json({
            message: "Message created successfully",
            messages: savedMessage
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { messageId } = reqBody
        const deletedMessage = await Messages.findByIdAndDelete(messageId)
        if (!deletedMessage) {
            return NextResponse.json({ message: "PromoCode not found" }, { status: 404 })
        }
        return NextResponse.json({
            message: "Message deleted successfully",
            messages: deletedMessage
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}