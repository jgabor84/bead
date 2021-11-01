export interface Order {
    id: number;
	status: string;
	createdAt: Date;
	invoice_firstName: string;
	invoice_middleName: string;
	invoice_lastName: string;
	invoice_tel: string;
	invoice_postcode: string;
	invoice_city: string;
	invoice_address: string;
	ship_firstName: string;
	ship_middleName: string;
	ship_lastName: string;
	ship_tel: string;
	ship_postcode: string;
	ship_city: string;
	ship_address: string;
}
