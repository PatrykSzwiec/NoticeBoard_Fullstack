import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditForm = ({ action, user, ...props }) => {

	const id = props.id;
	const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '')
  const [publishDate, setPublishDate ] = useState(new Date());
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(props.photo || null); 
	
  const handleSubmit = e => {
		e.preventDefault();
		action({ title, content, price, publishDate, location, id, image, user });
  }

  return (
		<div style={{ width: '70%' }} className="m-auto" >
			
			<Form onSubmit={handleSubmit}>

				<Form.Group className="mb-3" controlId="formTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Content if the ad</Form.Label>
					<ReactQuill as="textarea" value={content} onChange={setContent} />    
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPrice">
					<Form.Label>Price</Form.Label>
					<Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />      
				</Form.Group>

				<Form.Group className="mb-3" controlId="formDate">
					<Form.Label>Date</Form.Label>
					<DatePicker selected={publishDate} onChange={(date) => setPublishDate(date)} />      
				</Form.Group>

				<Form.Group className="mb-3" controlId="formLocation">
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />      
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPhoto">
					<Form.Label>Image</Form.Label>
					<Form.Control 
						type="file" 
						onChange={e => setImage(e.target.files[0])} />      
				</Form.Group>

				<Button variant="warning" type="submit">Submit</Button>
			</Form>
		</div>
  )
};

export default EditForm;