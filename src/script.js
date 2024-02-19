(() => {
    const dataDict = [];


    const canvas = document.getElementById("canvas");
    const imgCanvas = document.getElementById("imgCanvas");
    const context = canvas.getContext("2d");

    const image = new Image();
       // 画像読み込み完了
    image.onload =  ()=>{
        canvas.width = image.width;
        canvas.height = image.height;

        imgCanvas.width = image.width;
        imgCanvas.height = image.height;
        
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.onerror = ()=>alert("読み込めませんでした");

       // ファイル読み込み完了
    const reader = new FileReader();

    reader.onload = () => image.src = reader.result;

    document.getElementById("input").addEventListener("change",function(){
        // ファイル読み込み開始
        reader.readAsDataURL(this.files[0]);
    });


    document.getElementById("imgCanvas").addEventListener("click", (e) => { 
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");

        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        let ratioX = canvas.width / rect.width;
        let ratioY = canvas.height / rect.height;

        context.beginPath();
        context.arc(mouseX * ratioX, mouseY * ratioY, 50, 0, Math.PI * 2, false);
        context.fill();

        // console.log(mouseX, mouseY, rect.width, ratioX, ratioY);


        const table = document.getElementById("table");
        tableNum = table.childElementCount;
        let trElem = document.createElement("tr");
        trElem.innerHTML = `
            <td>${tableNum}</td>
            <td>${mouseX * ratioX}</td>
            <td>${mouseY * ratioY}</td>
        `;
        table.insertAdjacentElement("beforeend", trElem);

        dataDict.push({
            "no": tableNum,
            "x": mouseX * ratioX,
            "y": mouseY * ratioY
        });
        console.log(dataDict);
        document.getElementById('num').innerText = tableNum;
    });


    document.getElementById("dlBtn").addEventListener("click", () => {
        const header = "no,x,y\r\n";
        let data = header;

        for(let i=0; i<dataDict.length; i++) {
            data += `
                ${dataDict[i]["no"]},${dataDict[i]["x"]},${dataDict[i]["y"]}\r
            `;
        }

        const bom = new Uint8Array([0xef, 0xef, 0xef]);
        const blob = new Blob([bom, data], {type: "text/csv"});
        const objectUrl = URL.createObjectURL(blob);

        const dlLink = document.createElement("a");
        const filename = "data.csv";
        dlLink.download.filename;

        dlLink.href = objectUrl;

        dlLink.click();
        dlLink.remove();
    });
})();
