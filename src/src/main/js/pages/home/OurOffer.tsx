import React, {FC} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const OurOffer: FC = () => (
	<Container>
		<Row className="pt-5 mt-5">
			<Col>
				<h2>Quality Control</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum, eros
					id blandit fermentum, nunc risus tincidunt tellus, sed dignissim nibh nibh sit
					amet turpis. Nunc vel consequat enim. Fusce dignissim est dapibus, elementum
					nisi id, tempus nulla. Nulla facilisi. Etiam et enim porta felis vehicula
					mollis. Donec porttitor ultricies tortor et laoreet. Ut et urna urna.
				</p>
			</Col>
			<Col className="text-center">
				<Image src="img/offer-quality.jpg" roundedCircle />
			</Col>
		</Row>
		<Row className="pt-5 mt-5">
			<Col className="text-center">
				<Image src="img/offer-security.jpg" roundedCircle />
			</Col>
			<Col>
				<h2>Secure Payment</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum, eros
					id blandit fermentum, nunc risus tincidunt tellus, sed dignissim nibh nibh sit
					amet turpis. Nunc vel consequat enim. Fusce dignissim est dapibus, elementum
					nisi id, tempus nulla. Nulla facilisi. Etiam et enim porta felis vehicula
					mollis. Donec porttitor ultricies tortor et laoreet. Ut et urna urna.
				</p>
			</Col>
		</Row>
		<Row className="pt-5 mt-5">
			<Col>
				<h2>Safe Transportation</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum, eros
					id blandit fermentum, nunc risus tincidunt tellus, sed dignissim nibh nibh sit
					amet turpis. Nunc vel consequat enim. Fusce dignissim est dapibus, elementum
					nisi id, tempus nulla. Nulla facilisi. Etiam et enim porta felis vehicula
					mollis. Donec porttitor ultricies tortor et laoreet. Ut et urna urna.
				</p>
			</Col>
			<Col className="text-center">
				<Image src="img/offer-transportation.jpg" roundedCircle />
			</Col>
		</Row>
	</Container>
);

export default OurOffer;
