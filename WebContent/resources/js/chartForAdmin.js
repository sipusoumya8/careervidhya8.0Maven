


let myPieChrtForBatch = document.getElementById('myPieChrtForBatch').getContext('2d');
      //global options
      var ctx = $('#myPieChrtForBatch');
        ctx.height = 200;
      Chart.defaults.global.defaultFontFamily = 'Lato';
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = '#777';
      
      let myPieChrtBatch = new Chart(myPieChrtForBatch, {
        type:'pie',
        data:{
          labels:['present','absent'],
          datasets:[{
            label:'Population',
            data:[79,21],
            //backgroundColor:'green'
            backgroundColor:[
              'rgba(255,99,132,0.6)',
              'rgba(54,162,235,0.6)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }]
        },
        options:{
          title:{
            display : true,
            text : 'Your attendence',
            fontSize:25
          },
          legend:{
            display:true,
            position:'right',
            labels:{
              fontColor:'#000'
            }
          },
          layouts:{
            padding:{
              left:50,
              right:0,
              bottum:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }


      });