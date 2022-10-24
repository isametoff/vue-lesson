import http from '@/api/http';

export async function all(){
	let { data } = await http.get('products');
	let products = data? data.data:''
	return products;
}