import queryString from "query-string";
import { ALL_QUOTES_APIS, Env, QUOTE_PAGE_SIZE } from "../constants";
import QuoteModel from "../models/QuoteModel";

// const API = ALL_QUOTES_APIS[Env.DEV];
const API = ALL_QUOTES_APIS[Env.PROD];
const pageSize = QUOTE_PAGE_SIZE;
// GET /api/quotes?authorName=AlBeRt
// GET /api/quotes?text=wAnT
// GET /api/quotes?sortBy=-authorName,text
// GET /api/quotes/:id

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
};

export type QuotesResponse = {
  results: Array<QuoteModel>;
  pagination: Pagination;
};

export async function loadAll(page: number): Promise<QuotesResponse> {
  const params = { pageSize };
  if (page > 0) {
    params["page"] = page;
  }
  return await callService(`?${queryString.stringify(params)}`);
}

export async function searchById(id: number | string): Promise<QuotesResponse> {
  return await callService(`/${Number(id)}`);
}

export async function searchByAuthor(authorName: string, page: number): Promise<QuotesResponse> {
  const params = { authorName, pageSize };
  if (page > 0) {
    params["page"] = page;
  }
  return await callService(`?${queryString.stringify(params)}`);
}

export async function searchByText(text: string, page: number): Promise<QuotesResponse> {
  const params = { text, pageSize };
  if (page > 0) {
    params["page"] = page;
  }
  return await callService(`?${queryString.stringify(params)}`);
}

async function callService(url: string): Promise<QuotesResponse> {
  // const response = await fetch(`${API}${url}`);

  return await fetch(`${API}${url}`).then((response) => response.json());
}
