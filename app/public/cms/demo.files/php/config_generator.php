<?php
/**
 * Smarty php
 * https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B
 *
  ------------------------------------------------------------
  Deidcated to only generate config.inc.php
  documentation/php-forms.html

  Do not use this script in production!
  ------------------------------------------------------------
**/
  require_once('../../php/config.inc.php');
  require_once('../../php/sow_core/sow.init.php');
  require_once('../../php/sow_core/sow.core.php');
  $SOW = new SOW_Core; /* Init */


  // Action Check!
  if($SOW->_postVar('action') != 'config_generate')
    exit;

  // Array check
  $array['config'] = $SOW->_postVar('config');
  if(!is_array($array['config']))
    exit;





  // --
  $i                  = 0;
  $total_entries      = count($array['config']['smtp']['host']);
  $___configSmtpTpl   = '';
  $array['config']['time_zone'] = isset($array['config']['time_zone'])  ? trim(strip_tags($array['config']['time_zone'])) : 'Europe/Bucharest';
  // --

  if($total_entries < 1)
    exit;



  for($i = 0; $i < $total_entries; $i++) {

    $__name__     = isset($array['config']['smtp']['name'][$i])     ? (string) trim(strip_tags($array['config']['smtp']['name'][$i]))   : 'No Name';
    $__name__     = ($__name__ == '') ? 'No Name' : $__name__;
    $__enabled__  = isset($array['config']['smtp']['enabled'][$i])  ? (int) $array['config']['smtp']['enabled'][$i]                     : 1;
    $__enabled__  = ($__enabled__ > 0) ? 'true' : 'false';
    $__host__     = isset($array['config']['smtp']['host'][$i])     ? (string) trim(strip_tags($array['config']['smtp']['host'][$i]))   : '';
    $__port__     = isset($array['config']['smtp']['port'][$i])     ? (int) $array['config']['smtp']['port'][$i] : 587;
    $__type__     = isset($array['config']['smtp']['type'][$i])     ? (string) trim(strip_tags($array['config']['smtp']['type'][$i]))   : 'tls'; // tls
    $__type__     = ($__type__ == '') ? 'tls' : $__type__;
    $__user__     = isset($array['config']['smtp']['user'][$i])     ? (string) trim(strip_tags($array['config']['smtp']['user'][$i]))   : '';
    $__pass__     = isset($array['config']['smtp']['pass'][$i])     ? (string) strip_tags($array['config']['smtp']['pass'][$i])     : '';


    // Append SMTP provider one by one.
    $___configSmtpTpl .= "
      /* 

        " . $__name__ . "

      */
      [ 
        'name'      => '" . $__name__ . "',           // Informative only
        'enabled'   => " . $__enabled__ . ",            // true|false

        'host'      => '" . $__host__ . "',
        'port'      => " . $__port__ . ",             // 25, 465 or 587
        'type'      => '" . $__type__ . "',           // secure type: tls or ssl (ssl is deprecated)
        'user'      => '" . $__user__ . "',
        'pass'      => '" . $__pass__ . "',
      ],

    ";


  }




  /**

    Departments
    For now, we set only one - the wildcard!
    Manual edit is required for multiple!

  **/
  $__departmentName__   = trim(strip_tags($array['config']['department']['name']));
  $__departmentEmail__  = trim(strip_tags($array['config']['department']['email']));







// Final config format
$___configAsString = "<?php
/** **********************************************************
 *
 *  Smarty
 *  https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B
 *  documentation/php-forms.html
 *
********************************************************** **/
\$display_errors = false;   // see init.php
@date_default_timezone_set('{$array['config']['time_zone']}');
@ini_set('memory_limit', '128M');




/** **********************************************************
 *
 *  Email Contacts
 *  Used by contact forms
 *
 *  You can set multiple departments. 
 *  If not needed, just edit the \"Wildcard\" section!
 *
 *  1. Wildcard (*)
 *      if set, gets a copy all emails sent to any department!
 *
 *  2. Department
 *    gets the emails that has the destination its department.
 *
 *    Departments are set by adding a \"deparment\" field to HTML contact form:
 *
 *    <select class=\"\" name=\"contact_department\">
 *      <option value=\"marketing\">Marketing</option>
 *      <option value=\"support\">Support</option>
 *      <option value=\"\">Other</option>
 *    </select>
 *
 *    If no html department field is detected, emails are sent to * by default.
 *    There is no limit for wildcards and departments.
 *
********************************************************** **/
\$config['email_contacts'] = [

  [  /* [WILDCARD] OWNER / CEO / etc */
    'enabled'       => true,
    'department'    => '*',
    'name'          => '{$__departmentName__}',
    'email'         => '{$__departmentEmail__}',
  ],


  /* DEPARTMENTS EXAMPLES (disabled by default) */


  [ /* Marketing */
    'enabled'       => false,
    'department'    => 'marketing',
    'name'          => 'Mellissa Doe',
    'email'         => 'mellisa.doe@mydomain.com',
  ],

  [ /* Support */
    'enabled'       => false,
    'department'    => 'support',
    'name'          => 'Mellissa Doe',
    'email'         => 'support@mydomain.com',
  ],

  // ... duplicate if more needed

];




/** **********************************************************
 *
 *  @Email Providers
 *  Config used by sow_core/sow.smtp.php
 *
 *
 *  Set one or more email providers (as redundancy) to send emails.
 *  If first one fail, next one is used (and so on)... until email is sent.
 *
 *  Works with any transactional email provider: 
 *  Amazon SES, Mailgun, Sendinblue, private hosting, etc
 *
********************************************************** **/
\$config['sow.smtp:phpmailer_dir'] = '{$config['sow.smtp:phpmailer_dir']}';  // phpmailer path|version
\$config['sow.smtp:provider_email_list'] = [

    {$___configSmtpTpl}



    /** 

      Add more if needed, the same format 
      copy/paste an array above and edit.

      Transactional email providers you might like 
      (Smarty has nothing to do with them, we just used them over time for various projects)

        Amazon SES  https://aws.amazon.com/ses/
        Mailgun:    https://www.mailgun.com/
        Sendinblue  https://www.sendinblue.com/
        Sendgrid    https://sendgrid.com/

    **/


];;

"; // 2 x `;`, after a space





/*

  Well Done!
  Download string as file!

*/
$SOW->file_download_from_string($___configAsString, 'config.inc.php');
exit;