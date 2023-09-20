import Button from 'react-bootstrap/Button'

export default function (props) {
  return (
    <Button 
      variant={props.variant}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </Button>
  )
}