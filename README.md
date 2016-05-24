# OnTheFly
Minimal On-The-Fly dashboard generator fro CartoDB's [DeepInsights](https://github.com/CartoDB/deep-insights.js/)

This tool let's you generate a simple dashboard right out of an import, or as a result of an external app

## How to:
Your app must generate a JSON like:
````javascript
{
    "user": "abel",
    "table": "andrew.atm_transactions",
    "field": "amount",
    "widgets": [
        {
            "type": "formula",
            "options": {
                "title": "Total amount",
                "column": "amount",
                "operation": "sum"
            }
        },
        {
            "type": "histogram",
            "options": {
                "title": "Amount",
                "column": "amount",
                "bins": 10,
                "normalize": true,
                "operation": "count"
            }
        },
        {
            "type": "category",
            "options": {
                "title": "ATMs",
                "column": "atm_id",
                "aggregation_column": "amount",
                "aggregation": "count"
            }
        }
    ]
}
````
Where:
* Compulsory params:
 * **user:** CartoDB user name
 * **table:** the table to be previsualize
* Optional params:
 * **field:** If not specified, the features will be styled as default, but if a **NUMERIC** value is given, [Turbo Carto](https://github.com/CartoDB/turbo-carto) will be used.
 * **widgets:** Array of widgets, with the compulsory params:
    * **type:** may be: `formula`, `category`, `histogram` or `timeseries`
    * **options:** The compulsory and optional options for each type of widget are described [here](https://github.com/CartoDB/deep-insights.js/blob/master/doc/api.md)
 * **title**
 * **description**
 * **bounds**
 * **center**
 * **zoom**
 * **logo** (url to it)


Once this JSON is generated, it should be minified and translated into a [Base64](https://en.wikipedia.org/wiki/Base64) token, so so the result  looks like:

````
eyJ1c2VyIjoiYWJlbCIsInRhYmxlIjoiYW5kcmV3LmF0bV90cmFuc2FjdGlvbnMiLCJmaWVsZCI6ImFtb3VudCIsIndpZGdldHMiOlt7InR5cGUiOiJmb3JtdWxhIiwib3B0aW9ucyI6eyJ0aXRsZSI6IlRvdGFsIGFtb3VudCIsImNvbHVtbiI6ImFtb3VudCIsIm9wZXJhdGlvbiI6InN1bSJ9fSx7InR5cGUiOiJoaXN0b2dyYW0iLCJvcHRpb25zIjp7InRpdGxlIjoiQW1vdW50IiwiY29sdW1uIjoiYW1vdW50IiwiYmlucyI6MTAsIm5vcm1hbGl6ZSI6dHJ1ZSwib3BlcmF0aW9uIjoiY291bnQifX0seyJ0eXBlIjoiY2F0ZWdvcnkiLCJvcHRpb25zIjp7InRpdGxlIjoiQVRNcyIsImNvbHVtbiI6ImF0bV9pZCIsImFnZ3JlZ2F0aW9uX2NvbHVtbiI6ImFtb3VudCIsImFnZ3JlZ2F0aW9uIjoiY291bnQifX1dfQ==
````

Now, you only need to point to

## http://cartodb.github.io/onthefly/?token

v.G.:

http://cartodb.github.io/onthefly/?eyJ1c2VyIjoiYWJlbCIsInRhYmxlIjoiYW5kcmV3LmF0bV90cmFuc2FjdGlvbnMiLCJmaWVsZCI6ImFtb3VudCIsIndpZGdldHMiOlt7InR5cGUiOiJmb3JtdWxhIiwib3B0aW9ucyI6eyJ0aXRsZSI6IlRvdGFsIGFtb3VudCIsImNvbHVtbiI6ImFtb3VudCIsIm9wZXJhdGlvbiI6InN1bSJ9fSx7InR5cGUiOiJoaXN0b2dyYW0iLCJvcHRpb25zIjp7InRpdGxlIjoiQW1vdW50IiwiY29sdW1uIjoiYW1vdW50IiwiYmlucyI6MTAsIm5vcm1hbGl6ZSI6dHJ1ZSwib3BlcmF0aW9uIjoiY291bnQifX0seyJ0eXBlIjoiY2F0ZWdvcnkiLCJvcHRpb25zIjp7InRpdGxlIjoiQVRNcyIsImNvbHVtbiI6ImF0bV9pZCIsImFnZ3JlZ2F0aW9uX2NvbHVtbiI6ImFtb3VudCIsImFnZ3JlZ2F0aW9uIjoiY291bnQifX1dfQ==


## CAVEATS

Remember the URL max length of 2048chars, so keep your dashboard simple to fit within the limits.
