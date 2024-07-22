
/*
    club=(0-12) // start from 0 to 12       0
    dimond=(13-25) // start from 13 to 25   1
    heart=(26-38) //start from 26 to 38     2
    Spade=(39-51) // start from 39 to 51    3

    j=9, Q=10, K=11, A=12  
*/

var card_array=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26, 27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];

// card array contain values of card that will be used for other purpose

const card_picture=["card image/C_2.jpg","card image/C_3.jpg","card image/C_4.jpg","card image/C_5.jpg","card image/C_6.jpg","card image/C_7.jpg","card image/C_8.jpg","card image/C_9.jpg","card image/C_14.jpg","card image/C_11.jpg","card image/C_12.jpg","card image/C_13.jpg","card image/C_10.jpg","card image/D_2.jpg","card image/D_3.jpg","card image/D_4.jpg","card image/D_5.jpg","card image/D_6.jpg","card image/D_7.jpg","card image/D_8.jpg","card image/D_9.jpg","card image/D_14.jpg","card image/D_11.jpg","card image/D_12.jpg","card image/D_13.jpg","card image/D_10.jpg","card image/H_2.jpg","card image/H_3.jpg","card image/H_4.jpg","card image/H_5.jpg","card image/H_6.jpg","card image/H_7.jpg","card image/H_8.jpg","card image/H_9.jpg","card image/H_14.jpg","card image/H_11.jpg","card image/H_12.jpg","card image/H_13.jpg","card image/H_10.jpg","card image/S_2.jpg","card image/S_3.jpg","card image/S_4.jpg","card image/S_5.jpg","card image/S_6.jpg","card image/S_7.jpg","card image/S_8.jpg","card image/S_9.jpg","card image/S_14.jpg","card image/S_11.jpg","card image/S_12.jpg","card image/S_13.jpg","card image/S_10.jpg"];

// random suffling of cards

card_array=shuffleArray(card_array);

function shuffleArray(array) 
{
    for (let i = array.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let n;
var totalRound=0;
var player_1=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var player_2=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var player_3=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var player_4=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];


distributeCard(n);

//distribution of cards among four player
function distributeCard(n)
{
    n=0;
    for(let i=0; i<card_array.length; i++)
    {
            if(i%13==0)
            {
                n=0;
            }
            if(i<13)
            {
                player_1[n]=card_array[i];
            }
            else if(i<26)
            {
                player_2[n]=card_array[i];

            }
            else if(i<39)
            {
                player_3[n]=card_array[i];

            }
            else if(i<52)
            {
                player_4[n]=card_array[i];
                //card_picture[card_array[i]]
            }
            n++;
    }
}

sortCard(player_1);
sortCard(player_2);
sortCard(player_3);
sortCard(player_4);



function sortCard(arr)
{
    let complete=false;
    while(!complete)
    {
        complete=true;
        for(let i=1; i<arr.length; i++)
        {
            if(arr[i-1]>arr[i])
            {
                complete=false;
                let temp=arr[i];
                arr[i]=arr[i-1];
                arr[i-1]=temp;
            }
        }
    }
}

//these array used to store current number of set in each round 
var Current_Set=[0,0,0,0];

//progressing set
var Progressing_Set=[0,0,0,0];





var pName=document.getElementById("pName"); //player turn id
var bid=document.getElementById("Set"); // number of set input id
var set=document.getElementById("sNo"); //container in which set input 
var show_bid=document.getElementsByClassName("show_bid")[0]; // container id that show no of bid of each player


//id of each four player container
var p1=document.getElementById("p1");
var p2=document.getElementById("p2");
var p3=document.getElementById("p3");
var p4=document.getElementById("p4");

// id of each four cards that put on card on cards on table
var c1=document.getElementById("c1");
var c2=document.getElementById("c2");
var c3=document.getElementById("c3");
var c4=document.getElementById("c4");


var nextRoundTurn=1; //in next round who will speak set first and whose card first
pName.value=1;
bid.value=1;
firstPlayerCard(); //show card of that player that speak set first
// used to display cards to each player and call sets
function firstPlayerCard()
{
    if(pName.value==1)
    {
        conatinerVisible(1);
        show_cards(player_1,1);
    }
    else if(pName.value==2)
    {
        conatinerVisible(2);
        show_cards(player_2,2);
    }
    else if(pName.value==3)
    {
        conatinerVisible(3);
        show_cards(player_3,3);
    }
    else if(pName.value==4)
    {
        conatinerVisible(4);
        show_cards(player_4,4);
    }
}
var noPlayer=0; //count that how many player speak sets
// this container responsible to show cards of each player
function judge_container()
{
    if(pName.value==1)
    {
        Current_Set[0]=bid.value;
        conatinerVisible(2);
        show_cards(player_2,2);
        pName.value++;
        noPlayer++;
    }
    else if(pName.value==2)
    {
        Current_Set[1]=bid.value;
        conatinerVisible(3);
        show_cards(player_3,3); 
        pName.value++;
        noPlayer++;
    }
    else if(pName.value==3)
    {
        Current_Set[2]=bid.value;
        conatinerVisible(4);
        show_cards(player_4,4); 
        pName.value++;
        noPlayer++;
    }
    else if(pName.value==4)
    {
        flag=1;
        pName.value=1;
        conatinerVisible(1);
        Current_Set[3]=bid.value;
        show_cards(player_1,1); 
        noPlayer++;
    }
    if(noPlayer==4)
    {
        set.style.display="none";
        show_bid.style.display="inline-block";  
        updateBidElement(0);
        createTableRow();
    }
    bid.value=1;
}

function updateBidElement(num)
{
    show_bid.innerHTML=Progressing_Set[num]+"/"+Current_Set[num];
}

//this conatiner responsible for which player container is visible to you

function conatinerVisible(num)
{
    if(num==1)
    {
        p1.style.display="inline-block";
        p2.style.display="none";
        p3.style.display="none";
        p4.style.display="none";
    }
    else if(num==2)
    {
        p1.style.display="none";
        p2.style.display="inline-block";
        p3.style.display="none";
        p4.style.display="none";
    }
    else if(num==3)
    {
        p1.style.display="none";
        p2.style.display="none";
        p3.style.display="inline-block";
        p4.style.display="none";
    }
    else
    {
        p1.style.display="none";
        p2.style.display="none";
        p3.style.display="none";
        p4.style.display="inline-block";
    }
}

//with the help of this function it can show cards
function show_cards(arr,num)
{
    
    let card;
    for(let i=0; i<13; i++)
    {
        if(num==1)
        {
            card=document.getElementsByClassName("card_1")[i];
        }
        else if(num==2)
        {
            card=document.getElementsByClassName("card_2")[i];
        }
        else if(num==3)
        {
            card=document.getElementsByClassName("card_3")[i];
        }
        else if(num==4)
        {
            card=document.getElementsByClassName("card_4")[i];
        }
        if(arr[i]!=-1)
        {
            card.style.display="inline";
            card.src=card_picture[arr[i]]; 
        }
        else
        {
            card.style.display="none";
        }
    }
    
}




var cardInstance=[-1,-1,-1,-1];

function CardIndentifier(index,num)
{
    if(flag==1)
    {
       let card;
        if(num==1)
        {
            card=document.getElementsByClassName('card_1')[index];
        }
        else if(num==2)
        {
            card=document.getElementsByClassName('card_2')[index];
        }
        else if(num==3)
        {
            card=document.getElementsByClassName('card_3')[index];
        }
        else
        {
            card=document.getElementsByClassName('card_4')[index];
        }
        
        start_game(card,num,index);
    }
}

var subMoves=0;
var first_player;
function start_game(card,num,index)
{
    /*
        player number , card class, index number

        1:show card on cards on table
        {
            first player card on id c1 so on
        }
        2: player array update player_num[index]=-1;
        show cards of next player

        3: when each four player draw one card then decide which player is set and he draw card
        

        for deciding whom this set belong we store four card value acc to player number index in card instance array

    */
    cardInstance[num-1]=cardValue(num,index);
    
    subMoves++;


    if(subMoves==1)
    {
        first_player=num-1;
        
    }
    
   if(num==1)
   {
        player_1[index]=-1;
        card.style.display="none";
        putCardOnTable(card);
        conatinerVisible(2);
        show_cards(player_2,2);
        pName.value=2;
        updateBidElement(num);
        
   }
   else  if(num==2)
   {
        player_2[index]=-1;
        card.style.display="none";
        putCardOnTable(card);
        conatinerVisible(3);
        show_cards(player_3,3);
        pName.value=3;
        updateBidElement(num);
        
   }
   else if(num==3)
   {
        player_3[index]=-1;
        card.style.display="none";
        putCardOnTable(card);
        conatinerVisible(4);
        show_cards(player_4,4);
        pName.value=4;
        updateBidElement(num);
        
   }
   else  if(num==4)
   {
        player_4[index]=-1;
        card.style.display="none";
        putCardOnTable(card);
        conatinerVisible(1);
        show_cards(player_1,1);
        pName.value=1;
        updateBidElement(0);
        
   }
   if(subMoves==4)
   {
        //identify set 
        // whose player turn now
        // disappear card from table
        subMoves=0;
       
        let playerTurn=identifySet();
        Progressing_Set[playerTurn]++;
        pName.value=playerTurn+1;
        conatinerVisible(pName.value);
        setTimeout(disappearTableCard, 1000); 
        if(playerTurn+1 == 1)
        {
            show_cards(player_1,1);
        }
        else if(playerTurn+1 == 2)
        {
            show_cards(player_2,2);
        }
        else if(playerTurn+1 == 3)
        {
            show_cards(player_3,3);
        }
        else if(playerTurn+1 == 4)
        {
            show_cards(player_4,4);
        }
        updateBidElement(playerTurn);

        if(endGame(num)==1)
        {
            reUpdateTotalScore();
            restartGame();
        }
   }
}


function cardValue(num,index)
{
    
    if(num== 1)
    {
        
        return player_1[index];
    }
    else if(num== 2)
    {
       
        return player_2[index];
    }
    else if(num== 3)
    {
        
        return player_3[index];
    }
    else if(num== 4)
    {
        return player_4[index];
    }
    else
    {
        
        return -1;
    }
}


function putCardOnTable(card)
{
    if(subMoves==1)
    {
        c1.src=card.src;
    }
    else if(subMoves==2)
    {
        c2.src=card.src;
    }
    else if(subMoves==3)
    {
        c3.src=card.src;
    }
    else if(subMoves==4)
    {
        c4.src=card.src;
    }
}


function disappearTableCard()
{
    c1.src=" ";
    c2.src=" ";
    c3.src=" ";
    c4.src=" ";
}


function identifySet()
{
    
    let card_type=cardInstance[first_player];   
    
    let seter=0;
    let max_card=-1;
    for(let i=0; i<4; i++)
    {
        
         if(Math.floor(card_type/13)==0)
         {
            if(Math.floor(cardInstance[i]/13)==Math.floor(card_type/13) || Math.floor(cardInstance[i]/13)==3)
            {
                if(max_card<cardInstance[i])
                {
                    seter=i;
                    max_card=cardInstance[i];
                }
            }
                
         }
         else if(Math.floor(card_type/13)==1)
         {
            if(Math.floor(cardInstance[i]/13)==Math.floor(card_type/13) || Math.floor(cardInstance[i]/13)==3)
            {
                if(max_card<cardInstance[i])
                {
                    seter=i;
                    max_card=cardInstance[i];
                }
            }
                
         }
         else if(Math.floor(card_type/13)==2)
         {
            if(Math.floor(cardInstance[i]/13)==Math.floor(card_type/13) || Math.floor(cardInstance[i]/13)==3)
            {
                if(max_card<cardInstance[i])
                {
                    seter=i;
                    max_card=cardInstance[i];
                }
            }
                
         }
         else if(Math.floor(card_type/13)==3)
         {
            if(Math.floor(cardInstance[i]/13)==Math.floor(card_type/13) || Math.floor(cardInstance[i]/13)==3)
            {
                if(max_card<cardInstance[i])
                {
                    seter=i;
                    max_card=cardInstance[i];
                }
            }
                
         }

    }
    
    return seter;
   
}




function endGame(num)
{
    if(num==1)
    {
        return noMoves(player_1);
    }
    else if(num==2)
    {
        return noMoves(player_2);
    }
    else if(num==3)
    {
        return noMoves(player_3);
    }
    else
    {
        return noMoves(player_4);
    }
}



function noMoves(arr)
{
    let val=0;
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i]==-1)
        {
            val++;
        }
    }
    if(val==13)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

var total_score=[0,0,0,0];


var Player_score1=document.getElementById('Player_score1');
var Player_score2=document.getElementById('Player_score2');
var Player_score3=document.getElementById('Player_score3');
var Player_score4=document.getElementById('Player_score4');
var table=document.getElementsByClassName('table')[0];

function restartGame()
{
    totalRound++;
    if(totalRound==5)
    {
        decideWinner();
    }
    let m; //replaced by n=m;
    card_array=shuffleArray(card_array);
    noPlayer=0;
    distributeCard(m);
    
    sortCard(player_1);
    sortCard(player_2);
    sortCard(player_3);
    sortCard(player_4);
    
    Current_Set=[0,0,0,0];
    Progressing_Set=[0,0,0,0];
    pName.value=nextRoundTurn%4+1;
    bid.value=1;
    flag=0;
    set.style.display="inline-block";
    show_bid.style.display="none";
    // used to display cards to each player and call sets
    firstPlayerCard();
    subMoves=0;
    nextRoundTurn=nextRoundTurn%4+1;
    
}


var scoreBoardClick=0;


function showScoreBoard()
{
    if(scoreBoardClick%2==0)
    {
        table.style.display="inline-block";
    }
    else
    {
        table.style.display="none";
    }
    scoreBoardClick++;
}




function createTableRow()
{
    
    updateTotalScore();

    let rows=document.createElement("div");
    let rowClass=document.createAttribute("class");
    rowClass.value="row";
    rows.setAttributeNode(rowClass);
    table.appendChild(rows);

    let selectRow=document.getElementsByClassName('row')[totalRound+1];
    table.insertBefore(selectRow,table.children[totalRound+1]);
    for(let i=0; i<5; i++)
    {
        const para=document.createElement("p");
        selectRow.appendChild(para);
    }

    updateEachRoundcore();

}



function updateTotalScore() //use number method here
{
    
    
    for(let i=0; i<4; i++)
    {
        total_score[i]=Number(total_score[i]) + Number(Current_Set[i]);
    }
    
    fillTotalScore();
}

function fillTotalScore()
{
   
    Player_score1.innerHTML=Number(total_score[0]);
    Player_score2.innerHTML=Number(total_score[1]);
    Player_score3.innerHTML=Number(total_score[2]);
    Player_score4.innerHTML=Number(total_score[3]);
}


function updateEachRoundcore()
{
    
    for(let i=5*(totalRound+1); i<(5+5*(totalRound+1)); i++)
    {
        let para=document.getElementsByTagName('p')[i];
        if(i%5==0)
        {
            para.innerHTML=totalRound+1;
        }
        else
        {
            para.innerHTML=Current_Set[i%5-1];
        }
    }
}


function reUpdateTotalScore()
{
    for(let i=0; i<4; i++)
    {
        total_score[i]= ( Number(total_score[i] ) - Number(Current_Set[i]) ) + rightSet(i);
    }
   
    fillTotalScore();
    updateEachRoundcore()
}


function rightSet(num) //current set[0]=4 progressing set[0]=5 then his set is 4.1 if progreesing set[0]=3 then his set score is -4;
{
    let answer;
    if(Number(Progressing_Set[num])>=Number(Current_Set[num]))
    {   
        if( (Number(Progressing_Set[num]) - Number(Current_Set[num]))>=10 )
        {
            answer=Number(Current_Set[num]) + (Number(Progressing_Set[num]) - Number(Current_Set[num]) )/100;
        }
        else
        {
            answer=Number(Current_Set[num]) + (Number(Progressing_Set[num]) - Number(Current_Set[num]) )/10;
        }     
    }
    else
    {
        answer=-(Number(Current_Set[num]));
    }
    Current_Set[num]=Number(answer);
    return Number(answer);
}



function decideWinner()
{
    

    let duplicateTotal=[0,0,0,0];
    

    for(let i=0; i<4; i++)
    {
        duplicateTotal[i]=Number(total_score[i]);
    }
    

    sortCard(duplicateTotal);

    

   // document.getElementsByClassName('game_container')[0].style.display="none";
   // body.appendChild(table);
   // table.style.display="block";    

    table.style.height="50vh";
    table.style.border="2px solid black";
    
    
    let post=["Fourth: ","Third: ","Second: ","First: "];
    let playerName=["Player 1","Player 2","Player 3","Player 4"];

    

    for(let i=0; i<4; i++)
    {
        let position=document.getElementsByClassName("position")[i];
        
        position.innerHTML=post[i] + playerName[total_score.indexOf(duplicateTotal[i])];
    }


}





