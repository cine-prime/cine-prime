import Form from 'react-bootstrap/Form'

export default function TextControlsExample(props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control 
          placeholder={props.placeholder} 
          type={props.type} 
          value={props.value}
          onChange={props.onChange}
        />
      </Form.Group>
    </Form>
  );
}