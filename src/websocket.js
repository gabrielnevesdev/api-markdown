import { io } from "./app";
import mongoose from "mongoose";
import moment from "moment";
import Markdown from "./config/mongodb";

const uri = "mongodb+srv://root:root@markdowndb.geq5t.mongodb.net/markdowndb?retryWrites=true&w=majority";
const db = (uri)
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} , (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB");
    }
}
);
const defaultValue = "## Markdown Editor\n\nThis is a markdown editor.\n\n* * *";

io.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("getDocument", async data=>{
        const document = await getMarkdown(data);
        //console.log(document)
        socket.emit("document", document.data);
    })
    socket.on("markdown", data => {
        socket.broadcast.emit("markdown-content", data);
    })
   socket.on("setDocument", async data => {
       //console.log(data)
        await setMarkdown(data.title, data.data);
        socket.emit("save", "Saved");
    })
}

);

async function getMarkdown(title) {
    if(title == null) return

    const markdown = await Markdown.findOne({title: title});
    if(markdown == null) {
        const newMarkdown = new Markdown({
            title: title,
            data: defaultValue,
            update: moment(new Date()).format("HH:mm:ss")
        });
        await newMarkdown.save();
        return newMarkdown;
    }
    else{
        return markdown;
    }
}

async function setMarkdown(title, data) {
    const markdown = await Markdown.findOne({title: title});
    if(markdown == null) {
        const newMarkdown = new Markdown({
            title: title,
            data: data,
            update: moment(new Date()).format("HH:mm:ss")

        });
        await newMarkdown.save();
        return newMarkdown;
    }
    else{
        console.log(markdown.update)
        const lastUpdate = moment(markdown.update, "HH:mm:ss");
        const currentUpdate = moment(new Date()).format("HH:mm:ss");
        const diff = moment().diff(lastUpdate, currentUpdate);
        if(diff > 10) {
            console.log('save')
            markdown.data = data;
            markdown.update = moment(new Date()).format("HH:mm:ss");
            await markdown.save();
            return markdown;
        }
    }
}