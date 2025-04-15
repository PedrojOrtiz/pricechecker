import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Card,
  Form,
} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import {
	useGetProductContificoMutation,
	useGetProductContificoQuery,
} from '../slices/contificoProductApiSlice';

const StorePriceChecker = () => {
	const [codigo, setCodigo] = useState('');
	const refCodInput = useRef();

	const [product, setProduct] = useState(null);

	const [getProductContifico, { isLoading, isFetching, isSuccess }] = useGetProductContificoMutation();

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log('submit');
		await searchProductHandler(codigo);
		refCodInput.current.focus();
	};

	const encryptPvpDist = (price) => {
		const priceArr = price.toString().split('.');
		return '9'
			.concat(priceArr[0])
			.concat('9')
			.concat(priceArr[1])
			.concat('9');
	};

	const searchProductHandler = async (codigo) => {
		try {
			const res = await getProductContifico(codigo).unwrap();
			if (res && res.length > 0) {
				setProduct(res);
			} else {
				setProduct([]);
			}
		} catch (err) {
			console.log(err || err?.message);
		}
	}

	useEffect(() => {
		try {
			if (!isLoading && !isFetching) {
				setCodigo('');
			}
		} catch (err) {
			console.log(err || err?.message);
		}
	}, [product]);

	return (
		<>
			<FormContainer>
				<br/><br/>
				<h1>Consulta Precio</h1>
				<Form onSubmit={submitHandler} accessKey='enter'>
					<Form.Group controlId='codigo' className='my-3'>
						<Form.Label>Ingrese el codigo</Form.Label>
						<Form.Control
							ref={refCodInput}
							autoComplete='off'
							type='text'
							placeholder='Igrese el codigo'
							value={codigo}
							onChange={(e) => setCodigo(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button
						type='submit'
						variant='primary'
						className='mt-2'
						disabled={isLoading}
						style={{ float: 'right' }}
						accessKey='enter'
					>
						Buscar
					</Button>
					{(isLoading || isFetching) && <Loader />}

					<br />
					<br />
				</Form>

				<hr />

				{product
					&& product.length !== 0
					&& (
					<Card className='text-center'>
						<Card.Header style={{ fontSize: '30px' }}>
							{product && product[0].nombre}
						</Card.Header>
						<Card.Img
							variant='top'
							src={product[0].imagen}
							alt='IMG'
							height={100}
							width={100}
						/>
						<Card.Body>
							<Card.Title>
								{product && product[0].codigo_barra}
							</Card.Title>
							<Card.Text
								style={{ fontSize: '35px', color: 'orange' }}
							>
								{product && '$'}
								{product &&
									(
										product[0].pvp1 *
										(1 + product[0].porcentaje_iva / 100)
									).toFixed(2)}
								<br />
								{product &&
									encryptPvpDist(
										(
											product[0].pvp4 *
											(1 +
												product[0].porcentaje_iva / 100)
										).toFixed(2)
									)}
							</Card.Text>
						</Card.Body>
						<Card.Footer className='text-muted'>
							{product &&
								parseInt(product[0].cantidad_stock) +
									' EN STOCK.'}
						</Card.Footer>
					</Card>
				)}
			</FormContainer>
		</>
	);
};
export default StorePriceChecker;
