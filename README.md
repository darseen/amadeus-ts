# Amadeus Node SDK Written In TypeScript

Amadeus provides a rich set of APIs for the travel industry. For more details, check out the [Amadeus for Developers portal](https://developers.amadeus.com).

## Important message

- This SDK is maintained **by the developer community only**. The Amadeus for Developers team doesn't support or maintain it.
- This package currently doesn't include types for all endpoints, but additional types are being added.

## Installation

This module has been tested using [Node LTS versions](https://nodejs.org/en/about/releases/) (16.x, 18.x, 20.x). You can install it using npm, pnpm or yarn.

```sh
npm install amadeus-ts
```

## Getting Started

To make your first API call, you will need to [register](https://developers.amadeus.com/register) for an Amadeus Developer Account and [set up your first application](https://developers.amadeus.com/my-apps).

## Usage

```ts
import Amadeus from "amadeus-ts";

const amadeus = new Amadeus({
  clientId: "REPLACE_BY_YOUR_API_KEY",
  clientSecret: "REPLACE_BY_YOUR_API_SECRET",
});

async function getFlightOffers() {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: "SYD",
      destinationLocationCode: "BKK",
      departureDate: "2024-12-01",
      adults: 2,
    });
    console.log(response.data);
  } catch (responseError) {
    console.log(responseError.code);
  }
}

getFlightOffers();
```

## Documentation

See the official [amadeus-node](https://github.com/amadeus4dev/amadeus-node) documentation.
