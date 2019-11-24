import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = props => {
  var Content;
  if (!props.isContent) {
    Content = () => {
      return <div />;
    };
  } else {
    const items = props.content.map(item => {
      return <li key={item}>{item}</li>;
    });

    Content = () => {
      return (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {items}
          </DialogContentText>
        </DialogContent>
      );
    };
  }

  return (
    <div>
      <Dialog
        open={true}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onKeyPress={props.close}
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <Content />

        <DialogActions>
          <Button onClick={props.close} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
