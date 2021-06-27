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
      description: 'odo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut met',
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
      description: 'Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ',
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
      description: 'Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
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
      description: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of m',
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
      description: 'proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and abo',
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
      description: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump ove',
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
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius mo',
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
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is ',
      other: {
            var1: 'valuesss',
            var2: 'value2'
          }
    }
  ];
  
  return { items: items, sourceURL: sourceURL }
}

export default readResources()
