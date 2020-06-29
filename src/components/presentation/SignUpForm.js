import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const SignUpForm = (props) => {
  // const { addToast } = useToasts();
  const { handleConfirm, state, updateState } = props;
  const { loading, email, password } = state;
  
  return (
    <Form>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => updateState("email", e.target.value)}
        />
        <FormText>Email associated with account</FormText>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password goes here"
          value={password}
          onChange={(e) => updateState("password", e.target.value)}
        />
        <FormText>Password associated with account</FormText>
      </FormGroup>
      <Button
        disabled={loading}
        color="success"
        block
        size="lg"
        style={{ marginTop: 40 }}
        onClick={() => handleConfirm()}
      >
        {loading ? "Logging in.." : "Log In"}
      </Button>
    </Form>
  );
};

export default SignUpForm;
