$(document).ready(function() {

    var bList = $("#bond-list");
    var theB = $("<div>");
    var bHp;
    var bAp;
    var vHp;
    var vAp;
    var otherB;
    var join = 0;
    var wins = 0;


    var bonds = [{
            name: "Brosnan",
            hp: 50,
            ap: 40,
            photo: "<img src ='assets/images/bond-brosnan.jpg'>"
        },

        {
            name: "Connery",
            hp: 75,
            ap: 30,
            photo: "<img src ='assets/images/bond-connery.jpg'>"
        },

        {
            name: "Craig",
            hp: 100,
            ap: 20,
            photo: "<img src='assets/images/bond-craig.jpg'>"
        },

        {
            name: "Moore",
            hp: 125,
            ap: 10,
            photo: "<img src='assets/images/bond-moore.jpg'>"
        }
    ]

    $.each(bonds, function() {
        var thisBond = $("<div class= 'bondBox'>");
        $(thisBond).addClass("bondable");
        $(thisBond).attr("name", this.name);
        $(thisBond).attr("hp", this.hp);
        $(thisBond).attr("ap", this.ap);
        $(thisBond).append(this.photo);
        $(bList).append(thisBond);
    })

    $("img").mouseenter(function() {
        $(this).fadeTo("fast", 1);
    })

    $("img").mouseleave(function() {
        $(this).fadeTo("fast", .5)
    })


    $(".bondable").click(function() {
        if (join === 0) {
            theB = this;
            bName = theB.getAttribute("name");
            bHp = theB.getAttribute("hp");
            bAp = theB.getAttribute("ap");
            $("#bfight").append("<h2>You:</h2><br>");
            $("#bfight").append(theB);
            $("#bfight").append(bName + "<br>");
            $("#bfight").append("<p id = 'bpdisp'> HP: " + bHp + "</p>");
            $(theB).off("click");
            $("#messageOne").html("Pick an Opponent");
            join++;
        } else {
            theV = this;
            vName = theV.getAttribute("name");
            vHp = theV.getAttribute("hp");
            vAp = Math.floor(theV.getAttribute("ap") / 2);
            $("#vfight").append("<h2>Opponent:</h2><br>");
            $("#vfight").append(theV);
            $("#vfight").append(vName + "<br>")
            $("#vfight").append("<p id = 'vpdisp'> HP: " + vHp + "</p>");
            $(theV).off("click");
            $("#messageOne").html("Fight");
            $("#bond-list").css("visibility", "hidden");
            $("#attack").css("visibility", "visible");
            }

    })
    var bRand = 0;
    var vRand = 0;

    $(".reset").click(function(){
    location.reload();
    })

    $("#attack").click(function(){
        vHp = (vHp - bAp);
        bHp = (bHp - vAp);
        $("#bpdisp").html("<p id = 'bpdisp'> HP: " + bHp + "</p>");
        $("#vpdisp").html("<p id = 'vpdisp'> HP: " + vHp + "</p>");

        if (bHp <= 0) {
            $("#messageOne").html("You Lost!");
            $("#attack").replaceWith("<button class='reset'>Reset</button>");
            $("body").css("visibility", "hidden");
            $(".reset").css("visibility", "visible");
            $("#messageOne").css("visibility", "visible");
        } 

        else if (vHp <= 0) {
            if (wins === 2) {
                $("#messageOne").html("You defeated " + theV.getAttribute("name") + "! You Win!!!");
                $("#bpdisp").empty();
                $("#attack").replaceWith("<button class='reset'>Reset</button>");
            } else {
                wins++;
                console.log("w: " + wins);
                vRand = 0;
                $("#vfight").empty();
                $("#messageOne").html("You defeated " + theV.getAttribute("name") + "! Pick another Opponent");
                $(".bondable").on("click");
                $("#bond-list").css("visibility", "visible");
                $("#attack").css("visibility", "hidden");
            }

        }  else {
            vRand = vRand + .1;
            bRand = bRand + .25;
            var brannum = (Math.random() * bRand) + 1;
            var vrannum = (Math.random() * vRand) + 1;
            bAp = Math.floor(bAp * brannum);
            vAp = Math.floor(vAp * vrannum);
            console.log("v: " + vrannum);
            console.log("b: " + brannum);
            console.log("v: " + vAp);
            console.log("b: " + bAp);
        }
    })

})
