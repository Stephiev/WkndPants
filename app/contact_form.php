<?php

if($_POST["submit"]) {
$to = "colbertlove12@gmail.com";
$contactpagesubject = $_POST["contactpagesubject"];
$contactfirstname = $_POST["contactpagefirstname"];
$contactpagelastname = $_POST["contactpagelastname"];
$contactpageemail = $_POST["contactpageemail"];
$contactpagemessage = 'First Name: '.$_POST["contactpagefirstname"]."\n"
.'Last Name: '.$_POST["contactpagelastname"]."\n"
.'Email: '.$_POST["contactpageemail"]."\n"
.'Message: '.$_POST["contactpagemessage"];
$headers = 'From: Weekend-Pants-Contact';

mail ($to, $contactpagesubject, $contactpagemessage, $headers);
echo "Your message has been sent";

}
?>
