import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Listen port: ${PORT}`);
});