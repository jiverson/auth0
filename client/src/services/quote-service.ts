import queryString from "query-string";
import { ALL_QUOTES_APIS, Env, QUOTE_PAGE_SIZE } from "../constants";
import QuoteModel from "../models/QuoteModel";

const API = ALL_QUOTES_APIS[Env.PROD];
const GRAPH = ALL_QUOTES_APIS[Env.GRAPH];
const pageSize = QUOTE_PAGE_SIZE;

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
  return await fetch(`${API}${url}`).then((response) => response.json());
}

export async function myQuotes(accessToken: string): Promise<Array<QuoteModel>> {
  const query = `{
    quotes {
      id
      authorName
      text
    }
  }`;

  const body = JSON.stringify({ query });
  return callGraphService(accessToken, body)
    .then((response) => response.json())
    .then(({ data }) => data.quotes);
}

export async function createMyQuote(accessToken: string, authorName: string, text: string): Promise<QuoteModel> {
  const query = `
    mutation {
      createQuote(quote: { authorName: "${authorName}", text: "${text}" }) {
        id
        authorName
        text
      }
    }
  `;

  const body = JSON.stringify({ query });
  return callGraphService(accessToken, body)
    .then((response) => response.json())
    .then(({ data }) => data.createQuote);
}

export async function deleteMyQuote(accessToken: string, id: string): Promise<Partial<QuoteModel>> {
  const query = `
    mutation {
      deleteQuote(id: "${id}") {
        id
      }
    }
  `;

  const body = JSON.stringify({ query });
  return callGraphService(accessToken, body)
    .then((response) => response.json())
    .then(({ data }) => data.deleteQuote);
}

export async function updateMyQuote(
  accessToken: string,
  id: string,
  authorName: string,
  text: string
): Promise<Partial<QuoteModel>> {
  const query = `
    mutation {
      updateQuote(
        id: "${id}"
        quote: { authorName: "${authorName}", text: "${text}" }
      ) {
        id
      }
    }
  `;

  const body = JSON.stringify({ query });
  return callGraphService(accessToken, body)
    .then((response) => response.json())
    .then(({ data }) => data.updateQuote);
}

export async function callGraphService(accessToken: string, body: string): Promise<any> {
  return await fetch(`${GRAPH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body
  });
}
