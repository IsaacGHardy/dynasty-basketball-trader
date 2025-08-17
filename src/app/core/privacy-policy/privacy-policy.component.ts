import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="page-container">
      <mat-card class="content-card">
        <mat-card-header>
          <mat-card-title>Privacy Policy</mat-card-title>
          <mat-card-subtitle>Last updated: August 17, 2025</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="privacy-content" [innerHTML]="privacyPolicyContent"></div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button (click)="goBack()">Back to App</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .content-card {
      background: #2c2c2c;
      color: #fff;
    }
    
    .content-card mat-card-title {
      color: #ff9800;
      font-size: 2rem;
    }
    
    .content-card mat-card-subtitle {
      color: #ccc;
    }
    
    .privacy-content {
      line-height: 1.6;
      color: #ccc;
    }
    
    .privacy-content h1,
    .privacy-content h2,
    .privacy-content h3 {
      color: #ff9800;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    
    .privacy-content h1 {
      font-size: 1.8rem;
      text-align: center;
    }
    
    .privacy-content h2 {
      font-size: 1.4rem;
      border-bottom: 2px solid #ff9800;
      padding-bottom: 0.5rem;
    }
    
    .privacy-content h3 {
      font-size: 1.2rem;
    }
    
    .privacy-content p {
      margin-bottom: 1rem;
    }
    
    .privacy-content ul, 
    .privacy-content ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    
    .privacy-content li {
      margin-bottom: 0.5rem;
    }
    
    .privacy-content a {
      color: #ff9800;
      text-decoration: underline;
    }
    
    .privacy-content a:hover {
      color: #ffb74d;
    }
    
    .privacy-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      background: #333;
    }
    
    .privacy-content th,
    .privacy-content td {
      border: 1px solid #555;
      padding: 0.5rem;
      text-align: left;
    }
    
    .privacy-content th {
      background: #444;
      color: #ff9800;
      font-weight: bold;
    }
    
    .privacy-content strong {
      color: #ff9800;
    }
    
    .privacy-content em {
      color: #ffb74d;
    }
    
    @media (max-width: 768px) {
      .page-container {
        margin: 1rem auto;
        padding: 0 0.5rem;
      }
      
      .content-card mat-card-title {
        font-size: 1.5rem;
      }
      
      .privacy-content h1 {
        font-size: 1.5rem;
      }
      
      .privacy-content h2 {
        font-size: 1.2rem;
      }
      
      .privacy-content h3 {
        font-size: 1.1rem;
      }
      
      .privacy-content table {
        font-size: 0.8rem;
      }
      
      .privacy-content th,
      .privacy-content td {
        padding: 0.3rem;
      }
    }
  `]
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) {}
  
  goBack(): void {
    this.router.navigate(['/']);
  }

  privacyPolicyContent = `
    <h1>PRIVACY POLICY</h1>
    
    <p><em><strong>Last updated August 17, 2025</strong></em></p>

    <p>This Privacy Notice for Dynasty Basketball Trader ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:</p>

    <ul>
      <li>Visit our website at <a href="http://www.dynastytrader.com" target="_blank">http://www.dynastytrader.com</a> or any website of ours that links to this Privacy Notice</li>
      <li>Engage with us in other related ways, including any sales, marketing, or events</li>
    </ul>

    <p><strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at dynastybasketballtrader&#64;gmail.com.</p>

    <h2>SUMMARY OF KEY POINTS</h2>

    <p><em><strong>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</strong></em></p>

    <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>

    <p><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>

    <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>

    <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

    <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</p>

    <p><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>

    <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>

    <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>

    <h2>TABLE OF CONTENTS</h2>

    <ol>
      <li>WHAT INFORMATION DO WE COLLECT?</li>
      <li>HOW DO WE PROCESS YOUR INFORMATION?</li>
      <li>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</li>
      <li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
      <li>WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</li>
      <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
      <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
      <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
      <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
      <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
      <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
      <li>DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
      <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
      <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
      <li>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
    </ol>

    <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>

    <h3>Personal information you disclose to us</h3>

    <p><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>

    <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>

    <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>

    <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

    <h3>Information automatically collected</h3>

    <p><em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>

    <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.</p>

    <p>The information we collect includes:</p>

    <ul>
      <li><em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.</li>
    </ul>

    <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>

    <p><em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em></p>

    <p><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>

    <ul>
      <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
    </ul>

    <h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>

    <p><em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>

    <p><em><strong><u>If you are located in the EU or UK, this section applies to you.</u></strong></em></p>

    <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>

    <ul>
      <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
      <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
      <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
    </ul>

    <p><em><strong><u>If you are located in Canada, this section applies to you.</u></strong></em></p>

    <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>

    <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>

    <p><em><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</em></p>

    <p>We may need to share your personal information in the following situations:</p>

    <ul>
      <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
    </ul>

    <h2>5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>

    <p><em><strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.</em></p>

    <p>The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. We cannot guarantee the safety and privacy of data you provide to any third-party websites. Any data collected by third parties is not covered by this Privacy Notice.</p>

    <h2>6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>

    <p><em><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</em></p>

    <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>

    <h3>Google Analytics</h3>

    <p>We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Remarketing with Google Analytics. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">https://tools.google.com/dlpage/gaoptout</a>.</p>

    <h2>7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>

    <p><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>

    <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>

    <h2>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>

    <p><em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em></p>

    <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

    <h2>9. DO WE COLLECT INFORMATION FROM MINORS?</h2>

    <p><em><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</em></p>

    <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services.</p>

    <h2>10. WHAT ARE YOUR PRIVACY RIGHTS?</h2>

    <p><em><strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em></p>

    <p>In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.</p>

    <h2>11. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>

    <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>

    <h2>12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>

    <p><em><strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.</em></p>

    <h2>13. DO WE MAKE UPDATES TO THIS NOTICE?</h2>

    <p><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>

    <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>

    <h2>14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>

    <p>If you have questions or comments about this notice, you may contact us at:</p>

    <p><strong>Dynasty Basketball Trader</strong><br>
    Email: dynastybasketballtrader&#64;gmail.com</p>

    <h2>15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>

    <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information.</p>

    <p>To request to review, update, or delete your personal information, please contact us at dynastybasketballtrader&#64;gmail.com.</p>
  `;
}
