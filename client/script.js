var web3
var XYZContract
var currentAccountAddress

async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      await ethereum.request({
        method: "eth_requestAccounts",
      })
    } catch (error) {
      console.log(error)
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log("MetaMask not detected. You should consider trying MetaMask!")
  }

  // const networkId = await web3.eth.net.getId()

  await fetch("../build/contracts/CertificateIssuance.json")
    .then((response) => response.json())
    .then((ContractABI) => {
      XYZContract = new web3.eth.Contract(
        //automatically get ABI and address of smart contract
        ContractABI.abi,
        ContractABI.networks["5777"].address
      )
    })

  const accounts = await web3.eth.getAccounts()
  currentAccountAddress = accounts[0]
  console.log(currentAccountAddress, XYZContract)
}

async function getDetailsFromDatabase(uniId) {
  let details
  await fetch("../StudentsData.json")
    .then((response) => response.json())
    .then((data) => {
      details = data[uniId]
    })

  return details
}

async function callIssueCertificate() {
  // let dob = document.getElementById("dob").value
  //   ? document.getElementById("dob").value
  //   : 55
  // let att = document.getElementById("att").value
  //   ? document.getElementById("att").value
  //   : 64
  let uniId = document.getElementById("id").value
    ? document.getElementById("id").value
    : "UNI001"
  // let course = document.getElementById("course").value
  //   ? document.getElementById("course").value
  //   : "testcourse"

  const details = await getDetailsFromDatabase(uniId)

  if (!details) {
    throw new Error("Couldnt find such student in database.")
  }

  const ipfsObj = await ipfs.add(
    uniId + " \n " + details.name + " \n " + details.courseName
  ) // Stores in IPFS and returns the IPFS Hash
  const ipfsSendingHash = ipfsObj.path
  console.log("ipfsSendingHash: ", String(ipfsSendingHash))

  const res = await XYZContract.methods
    .issueCertificate(
      uniId,
      details.name,
      details.courseName,
      [
        details.firstSemesterMarks,
        details.secondSemesterMarks,
        details.thirdSemesterMarks,
      ],
      ipfsSendingHash
    )
    .send({
      from: currentAccountAddress,
    })

  console.log("res ", res)

  var curr = await XYZContract.methods.currentCertificateId().call()
  alert("The current certificate id is :", curr)
}

async function callCurrentCertificateId() {
  var curr = await XYZContract.methods.currentCertificateId().call()
  alert("The current certificate id is :", curr)
}

async function showDetails() {
  if (!document.getElementById("check").value) {
    alert("Enter a value in the text box!")
    return
  }

  let n = document.getElementById("check").value

  var data = await XYZContract.methods.certificates(n).call()
  alert(JSON.stringify(data))
}

async function showDetailsOfAll() {
  var curr = await XYZContract.methods.currentCertificateId().call()
  let certificates = []
  // Loop through all the certificates in the mapping
  for (let i = 1; i <= curr; i++) {
    // Get the certificate at index 'i'
    const certificate = await XYZContract.methods.certificates(i).call()
    // Add the certificate to the array
    certificates.push(certificate)

    const linkElement = document.createElement("a")
    linkElement.setAttribute(
      "href",
      `https://infura-ipfs.io/ipfs/${certificate.ipfsHash}`
    )
    linkElement.textContent =
      "View the certificate. Hash is:" + certificate.ipfsHash
    const ipfsDiv = document.getElementsByClassName("ipfsLink")[0]
    ipfsDiv.appendChild(linkElement)
    ipfsDiv.appendChild(document.createElement("br"))
  }

  alert(JSON.stringify(certificates))
}

async function revokeNumbered() {
  if (!document.getElementById("check").value) {
    alert("Enter a value in the text box!")
    return
  }

  let n = document.getElementById("check").value
  var status = await XYZContract.methods
    .revokeCertificate(n)
    .send({ from: currentAccountAddress })
  alert(JSON.stringify(status.status))
}

async function verifyCertificate() {
  if (!document.getElementById("check").value) {
    alert("Enter a value in the text box!")
    return
  }

  let n = document.getElementById("check").value
  var status = await XYZContract.methods.verifyCertificate(n).call()
  alert(status)
}

async function getIPFSlink() {
  if (!document.getElementById("check").value) {
    alert("Enter a value in the text box!")
    return
  }

  let n = document.getElementById("check").value
  const ipfsRecievingHash = await XYZContract.methods.getIPFSHash(n).call()

  const linkElement = document.createElement("a")
  linkElement.setAttribute(
    "href",
    `https://infura-ipfs.io/ipfs/${ipfsRecievingHash}`
  )
  linkElement.textContent = "View the certificate. Hash is:" + ipfsRecievingHash
  const ipfsDiv = document.getElementsByClassName("ipfsLink")[0]
  ipfsDiv.appendChild(linkElement)
}
