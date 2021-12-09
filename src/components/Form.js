import "./Form.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  LinearProgress,
} from "@mui/material";

const Form = () => {
  const MAX_STEPS = 3;

  const [formStep, setFormStep] = useState(0);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorAcceptPolicy, setErrorAcceptPolicy] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [progress, setProgress] = useState(0);

  const onTextUserNameChange = (e) => setUsername(e.target.value);
  const onTextAddressChange = (e) => setAddress(e.target.value);

  const handleChange = (event) => {
    setAcceptPolicy(event.target.checked);
  };

  const nextStep = () => {
    switch (formStep) {
      case 0:
        if (username === "") {
          setErrorUsername(true);
        } else {
          setFormStep((cur) => cur + 1);
          setErrorAddress(false);
          setProgress(33);
        }
        break;
      case 1:
        if (address === "") {
          setErrorAddress(true);
        } else {
          setFormStep((cur) => cur + 1);
          setErrorAddress(false);
          setProgress(66);
        }
        break;
      default:
        break;
    }
  };

  const previousStep = () => {
    setFormStep((cur) => cur - 1);
    setErrorUsername(false);
    setErrorAddress(false);
    setErrorAcceptPolicy(false);
    if (formStep >= 1) {
      setProgress(0);
    }
    if (formStep >= 2) {
      setProgress(33);
    }
  };

  const goPersonalInformation = () => {
    setErrorUsername(false);
    setErrorAddress(false);
    setErrorAcceptPolicy(false);
    setFormStep(0);
    setUsername("");
    setAddress("");
    setAcceptPolicy(false);
    setFormStep(0);
    setProgress(0);
  };

  const completeFormStep = () => {
    if (acceptPolicy === false) {
      setErrorAcceptPolicy(true);
    } else {
      setProgress(100);
      setFormStep((cur) => cur + 1);
    }
  };

  const submitForm = () => {
    if (acceptPolicy === false) {
      setErrorAcceptPolicy(true);
    } else {
      let json = [
        { username: username, address: address, acceptPolicy: acceptPolicy },
      ];
      setProgress(100);
      console.log(
        "El json enviado sera el siguiente:",
        JSON.stringify(json, null, 2)
      );
      completeFormStep();
    }
  };

  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <>
          <div>
            <Button
              style={{ margin: "10px" }}
              onClick={previousStep}
              type="button"
              variant="contained"
            >
              previous
            </Button>
            <Button onClick={submitForm} type="button" variant="contained">
              Create account
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          {formStep > 0 ? (
            <Button
              style={{ margin: "10px" }}
              onClick={previousStep}
              type="button"
              variant="contained"
            >
              previous
            </Button>
          ) : null}
          <Button onClick={nextStep} type="button" variant="contained">
            Next step
          </Button>
        </>
      );
    }
  };

  return (
    <div className="Form container">
      <form onSubmit={submitForm}>
        {formStep < MAX_STEPS && (
          <div>
            <p className="form-tittle">
              Step {formStep + 1} of {MAX_STEPS}
            </p>
          </div>
        )}
        <LinearProgress variant="determinate" value={progress} />
        {formStep === 0 && (
          <section>
            <h2 className="form-tittle">Personal information</h2>
            <div>
              <TextField
                label="Username"
                variant="outlined"
                onChange={onTextUserNameChange}
                value={username}
                error={errorUsername}
                helperText={errorUsername ? "Empty field." : ""}
              />
            </div>
          </section>
        )}
        {formStep === 1 && (
          <section>
            <h2 className="form-tittle">
              Where will you receive the information?
            </h2>
            <TextField
              label="Address"
              variant="outlined"
              onChange={onTextAddressChange}
              value={address}
              error={errorAddress}
              helperText={errorAddress ? "Empty field." : ""}
            />
          </section>
        )}
        {formStep === 2 && (
          <section>
            <h2 className="form-tittle">Legal information</h2>
            <FormControl
              required
              error={errorAcceptPolicy}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                value="accept"
                control={
                  <Checkbox checked={acceptPolicy} onChange={handleChange} />
                }
                label={
                  <span className="form-tittle">
                    I accept the privacy policy.
                  </span>
                }
              />
              {errorAcceptPolicy ? (
                <FormHelperText className="form-tittle">
                  You can display an error
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </section>
        )}
        {formStep === 3 && (
          <section>
            <h2 className="form-tittle">Congratulations!</h2>
            <Button
              onClick={goPersonalInformation}
              type="button"
              variant="contained"
            >
              Go to personal information!
            </Button>
          </section>
        )}
        <div className="button-container">{renderButton()}</div>
      </form>
    </div>
  );
};

export default Form;
