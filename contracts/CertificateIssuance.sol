// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0;

contract CertificateIssuance {
    // This mapping stores the certificates that have been issued.
    // Each uint256 (id) is linked to a struct (Certificate).
    mapping(uint256 => Certificate) public certificates;

    // The struct represents a certificate.
    struct Certificate {
        // string institute;
        uint256 id;
        string registrationId;
        string candidateName;
        string courseName;
        string ipfsHash;
        uint256 issuanceDate;
    }

    address public owner;
    uint256 public currentCertificateId = 0;

    // Constructor function, which is called only once i.e when the contract is deployed.
    // It sets the owner variable to the address that deployed the contract.
    constructor() public {
        owner = msg.sender;
    }

    // This function is called to issue a new certificate.
    // It takes the name of the candidate receiving the certificate, and the name of the certificate.
    function issueCertificate(
        string memory registrationId,
        string memory candidateName,
        string memory courseName,
        uint256[] memory semMarks,
        string memory ipfsHash
    ) public returns (uint256) {
        require(
            msg.sender == owner,
            "Only the contract owner can issue certificates."
        );

        for (uint256 i = 0; i < 3; i++) {
            require(semMarks[i] > 33, "Semester marks low!");
        }

        // Create a new certificate struct.
        Certificate memory cert = Certificate({
            id: currentCertificateId,
            registrationId: registrationId,
            candidateName: candidateName,
            courseName: courseName,
            ipfsHash: ipfsHash,
            issuanceDate: block.timestamp
        });

        // Store the certificate in the mapping "certificates".
        currentCertificateId = currentCertificateId + 1;
        certificates[currentCertificateId] = cert;

        // Increment current certificate number.

        return currentCertificateId;
    }

    // This function is called to verify a certificate.
    // It takes the ID of the certificate and returns true if the certificate exists,
    // and false if it does not exist.
    function verifyCertificate(uint256 id) public view returns (bool) {
        // Only the contract owner ( or the institute) that issued the certificate
        // can verify the certificate.
        // require(
        //     msg.sender == owner || certificates[id].institute == msg.sender,
        //     "Only the contract owner or the institute that issued the certificate can verify it."
        // );

        // Look up the certificate by its ID in the mapping.
        Certificate memory certificate = certificates[id];

        // Return true if the certificate exists, and false if it does not.
        return certificate.id != 0;
    }

    function verifyCertificateUsingReg(uint256 regId)
        public
        view
        returns (bool)
    {
        Certificate memory certificate = certificates[regId];

        // Return true if the certificate exists, and false if it does not.
        return (certificate.id > 0);
    }

    // This function is called to revoke a certificate.
    // It returns true if the operation was sucessful.
    function revokeCertificate(uint256 id) public returns (bool) {
        require(msg.sender == owner, "Only the contract owner can revoke.");

        //Checks if that certificate exists
        if (certificates[id].id != 0) {
            //Set that certificate's id to zero so the verify function will also return false.
            certificates[id].id = 0;
            return true;
        } else return false;
    }

    function getIPFSHash(uint256 id) public view returns (string memory) {
        return certificates[id].ipfsHash;
    }
}

//TODO- each certificate also has a CID hash through which we can visit IPFS to see the certificate.

//
