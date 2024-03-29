import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Autorenew } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 325,
        backgroundColor: "#212121",
        marginTop: 50
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        marginLeft: "auto",
        minWidth: 100,
        height: 100,
        marginRight: 10
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}));

export default function Materis() {
    const classes = useStyles();
    const theme = useTheme();

    const [materis, setMateris] = useState([]);
    const [users, setUsers] = useState([]);
    const [datas, setDatas] = useState([]);

    const token = localStorage.getItem("token");

    const gett = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: { Authorization: "Bearer " + token }
    });

    const getMateris = async () => {
        const materis = await gett.get("/api/materi/get");

        console.log(materis);
        setMateris(materis.data.data);
        setUsers(materis.data.user);

        console.log(result);
        const a = materis.data.data;
        const b = materis.data.user;

        const result = a.map(function(el, x = 0) {
            var o = Object.assign({}, el);
            o.username = b[x];
            x++;
            console.log(x);
            return o;
        });
        setDatas(result);

        // const c = [...a, ...b];
        // console.log(a);
        // console.log(b);
        // console.log(c);
        console.log(result);
    };

    const history = useHistory();

    const role = localStorage.getItem("role");

    useEffect(() => {
        getMateris();
        return () => {};
    }, []);

    const clickHandler = () => {
        history.push("/materi/create");
    };

    return (
        <React.Fragment>
            {role === "Guru" ? (
                <Button
                    onClick={clickHandler}
                    className=""
                    variant="contained"
                    color="primary"
                >
                    Create Materi
                </Button>
            ) : (
                ""
            )}
            <div className="row">
                {datas.map(data => {
                    const {
                        title,
                        description,
                        type,
                        attachment,
                        username,
                        id
                    } = data;
                    return (
                        <div
                            key={id}
                            onClick={() => {
                                {
                                    window.open(attachment);
                                }
                            }}
                            className="col-4"
                            role="button"
                        >
                            <Card className={classes.root}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            {title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                        >
                                            {username}
                                            <br />
                                            {description}
                                        </Typography>
                                    </CardContent>
                                </div>
                                {(() => {
                                    if (type === "youtube") {
                                        return (
                                            <CardMedia
                                                className={classes.cover}
                                                image="https://cdn.discordapp.com/attachments/772376128383483914/786844968466644992/youtube.png"
                                                title={type}
                                            />
                                        );
                                    } else if (type === "drive") {
                                        return (
                                            <CardMedia
                                                className={classes.cover}
                                                image="https://cdn.discordapp.com/attachments/772376128383483914/786777624063770644/Logo_of_Google_Drive.png"
                                                title={type}
                                            />
                                        );
                                    } else if (type === "doc") {
                                        return (
                                            <CardMedia
                                                className={classes.cover}
                                                image="https://cdn.discordapp.com/attachments/772376128383483914/786852187140521984/icons8-google-docs-480.png"
                                                title={type}
                                            />
                                        );
                                    } else if (type === "other") {
                                        return (
                                            <CardMedia
                                                className={classes.cover}
                                                image="https://cdn.discordapp.com/attachments/772376128383483914/786854726675202079/link.png"
                                                title={type}
                                            />
                                        );
                                    }
                                })()}
                            </Card>
                        </div>
                    );
                })}{" "}
            </div>
        </React.Fragment>
    );
}
