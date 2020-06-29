import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const SignUpForm = () => (
  <Form>
    <FormGroup>
      <Label>Email</Label>
      <Input type="text" placeholder="Email Address" />
      <FormText>Email associated with account</FormText>
    </FormGroup>
    <FormGroup>
      <Label>Password</Label>
      <Input type="password" placeholder="Password goes here" />
      <FormText>Password associated with account</FormText>
    </FormGroup>
    <Button color="success" block size="lg" style={{ marginTop: 40 }}>
      Log In
    </Button>
  </Form>
);

export default SignUpForm;
