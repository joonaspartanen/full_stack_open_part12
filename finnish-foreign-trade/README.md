# Finnish Foreign Trade Visualized: Full Stack Web Development Project Work

![CI](https://github.com/joonaspartanen/finnish-foreign-trade/workflows/CI/badge.svg)

## General info

This is a project work for the Helsinki University [Full Stack Web Development course](https://fullstackopen.com/en/).

Finnish Foreign Trade Visualized is a web application that uses the [Finnish Customs Uljas API](https://tulli.fi/en/statistics/uljas-api) (CC BY 4.0) to fetch statistical data on Finnish foreign trade (imports and exports) and visualizes it using interactive maps and charts. The user can filter the data by year, country of origin, country of destination, commodity code, etc.

![Finnish Foreign Trade Visualized screencast](https://github.com/joonaspartanen/finnish-foreign-trade/blob/master/documentation/screencast.gif)

## Technologies

The application backend uses Node.js and the frontend is built with React.

The data visualizations are mainly made with [amCharts](https://www.amcharts.com/) library. There are also some [D3.js](https://d3js.org/) implementations.

## Prerequisites

Make sure you have node and npm installed.

## How to run

First, clone the repository with `git clone https://github.com/joonaspartanen/finnish-foreign-trade.git`.

To start the application (both backend and frontend) in development mode, run the following command from the project root:

```bash
npm run dev
```

The frontend is now running on port 3000 and you can access it on http://localhost:3000/. The backend is running on port 3003.

## Demo

There is a demo available on Heroku: https://finnish-foreign-trade.herokuapp.com/

## Todos

- Mobile view needs work.

- Create own color scheme.

## Information for Course Evaluators

[Projektin tuntikirjanpito](https://github.com/joonaspartanen/finnish-foreign-trade/blob/master/documentation/tuntikirjanpito.md)
