//TODO реализовать DTO для /orders
export class ticketsData {
  film: string;
  session: string;
  daytime: string;
  row: string;
  seat: string;
  price: number;
}

export class MakeOrderDTO {
  email?: any;
  phone?: any;
  tickets: ticketsData[];
}

class OrderDataSuccess {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id: number;
}

export class OrderSuccessDTO {
  total: number;
  items: OrderDataSuccess[];
}

export class BookingPlacesDTO {
  filmId: string;
  sessionId: string;
  place: string;
}
