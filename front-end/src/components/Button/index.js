import Button from 'react-bootstrap/Button'

export default function (props) {
  return (
    <Button 
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  )
}