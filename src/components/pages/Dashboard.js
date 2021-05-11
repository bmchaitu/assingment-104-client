import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import mime from "mime-types";
import FileUpload from "./FileUpload";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: 50,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    display:'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  var history = useHistory();
  const getAllFiles = async () => {
    const files = await axios.get("api/files", {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    });

    setFiles(files.data);
  };
  useEffect(() => {
    //getAllFiles();
  }, []);
const handleClick = () => {
  localStorage.removeItem('auth-token');
  history.push('/');
}
  return (
    <React.Fragment><div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Button className={classes.title} onClick={handleClick} color="inherit">LogOut</Button>

      </Toolbar>
    </AppBar>
  </div>
    <main className={classes.content}>
      <FileUpload />
      <div className={classes.toolbar} style={{ marginTop: 20 }}>
        {files.length > 0 ? (
          <FileTable files={files} />
        ) : (
          <h4>There are currently no files</h4>
        )}
      </div>
    </main>
    </React.Fragment>
  );
}

function FileTable({ files }) {
  const classes = useStyles();
  const downloadFile = async (filename, alias) => {
    axios({
      url: `/api/file/${filename}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", alias);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 1000 }}>File Name</TableCell>
              <TableCell style={{ fontWeight: 1000 }} align="right">
                File Size
              </TableCell>
              <TableCell style={{ fontWeight: 1000 }} align="right">
                Type
              </TableCell>
              <TableCell style={{ fontWeight: 1000 }} align="right">
                Date Uploaded
              </TableCell>
              <TableCell style={{ fontWeight: 1000 }} align="right">
                Download
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file._id}>
                <TableCell component="th" scope="row">
                  {file.aliases}
                </TableCell>
                <TableCell align="right">{file.length / 1000} KB</TableCell>
                <TableCell align="right">
                  {mime.extension(file.contentType)}
                </TableCell>
                <TableCell align="right">
                  {new Date(file.uploadDate).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      downloadFile(file.filename, file.aliases);
                    }}
                  >
                    <GetAppIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
