/**
 * 
 * @returns the resources json read from the CSV file
 */
import $ from 'jquery';
// var csv = require('jquery-csv');
//  import VuePapaParse from 'vue-papa-parse'

function readResources(){
  var sourceURL = 'https://raw.githubusercontent.com/raulcano/bitcoin-resources/main/bitcoin-resources.csv';

  // The logic to retrieve the items goes here
  // **
  // To-do
  // **
  // read the csv file and load it

  
  // $.csv.toArray(sourceURL);

  // var data = VuePapaParse.parse(sourceURL);
  // alert(data)
  // VuePapaParse.parse(sourceURL, {
  //   download: true,
  //   // rest of config ...
  // })

	// $.ajax({
	//   type: "GET",  
	//   url: sourceURL,
	//   dataType: "text",       
	//   success: function(response)  
	//   {
	// 	data = $.csv.toArrays(response);
	// 	alert(data);
	//   }   
	// });

  var items = [
    {
      date: '2021-05',
      title: 'aThe bullish case for Bitcoin',
      type: 'article',
      link: 'https://testlink.com/bullish-case',
      language: 'es',
      author: 'Vijay',
      keywords: ['bullish', 'case', 'bitcoin'],
      other: {}
    },
    {
      date: '2020-06',
      title: 'bMasters and slave of money',
      type: 'article',
      link: 'https://testlink.com/masters-slaves',
      language: 'en',
      author: 'Robert',
      keywords: ['masters', 'case', 'bitcoin'],
      other: {
            var1: 'valuesss',
            var2: 'value2'
          }
    },
    {
      date: '2021-05',
      title: 'cThe bullish case for Bitcoin',
      type: 'article',
      link: 'https://testlink.com/bullish-case',
      language: 'es',
      author: 'Vijay',
      keywords: ['bullish', 'case', 'bitcoin'],
      other: {}
    },
    {
      date: '2020-06',
      title: 'dMasters and slave of money',
      type: 'article',
      link: 'https://testlink.com/masters-slaves',
      language: 'en',
      author: 'Robert',
      keywords: ['masters', 'case', 'bitcoin'],
      other: {
            var1: 'valuesss',
            var2: 'value2'
          }
    },
    {
      date: '2021-05',
      title: 'eThe bullish case for Bitcoin',
      type: 'article',
      link: 'https://testlink.com/bullish-case',
      language: 'es',
      author: 'Vijay',
      keywords: ['bullish', 'case', 'bitcoin'],
      other: {}
    },
    {
      date: '2020-06',
      title: 'fMasters and slave of money',
      type: 'article',
      link: 'https://testlink.com/masters-slaves',
      language: 'en',
      author: 'Robert',
      keywords: ['masters', 'case', 'bitcoin'],
      other: {
            var1: 'valuesss',
            var2: 'value2'
          }
    },
    {
      date: '2021-05',
      title: 'gThe bullish case for Bitcoin',
      type: 'article',
      link: 'https://testlink.com/bullish-case',
      language: 'es',
      author: 'Vijay',
      keywords: ['bullish', 'case', 'bitcoin'],
      other: {}
    },
    {
      date: '2020-06',
      title: 'hMasters and slave of money',
      type: 'article',
      link: 'https://testlink.com/masters-slaves',
      language: 'en',
      author: 'Robert',
      keywords: ['masters', 'case', 'bitcoin'],
      other: {
            var1: 'valuesss',
            var2: 'value2'
          }
    }
  ];
  
  return { items: items, sourceURL: sourceURL }
}

export default readResources()
