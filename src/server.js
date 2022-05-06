import { serverHttp } from "./app";
import './websocket';


serverHttp.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});