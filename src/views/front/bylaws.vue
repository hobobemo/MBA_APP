<script setup>
  import { IonPage, IonContent, IonText, IonGrid, IonRow, IonCol, } from '@ionic/vue';
  import { ref, onMounted } from 'vue';
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts"; 
  import Bylaw from '@/components/home/bylaws.vue';

  let items = ref(null);
  let isLoading = ref(true);
  const pageType = ref(0);

  const watchDatabase = () => {
      const dbRef = refer(database, "front/bylaws");
      onValue(dbRef, (snapshot) => {
          items.value = snapshot.val();
      });
  };

  function changePageNumber(value){
    pageType.value = value;
  }

  onMounted(() => {
      watchDatabase();
      isLoading.value = false;
  });
</script>

<template>
<ion-page>
    <ion-content :fullscreen="true">
      <ion-text color="primary" class="ion-padding">
        <ul class="ion-padding">Sec. 1. The Military Men’s Program shall feature 3 Divisions: Military Varsity “A”, Varsity “B”, and Intramural. </ul>
        <ul class="ion-padding">Sec. 2. The Military Women’s Program shall feature 1 Division: Women’s Military. </ul>
        <ul class="ion-padding">Sec. 3. The Seniors Program shall feature 3 Divisions: Men’s Over 50, Men’s Over 40 and Women’s Over 35. </ul>
        <ul class="ion-padding">Sec. 4. Rosters are limited to 25 Players. </ul>
        <ul class="ion-padding">Sec. 5. A bona fide Men’s Military Team consists of Active Duty and dependents (18 and over with a valid dependent ID card), Reserves, ROTC, National Guard, retired military personnel and Department of Defense civilians. All Players must have a Department of Defense Identification card. A bona fide Women’s Military Team consists of Active Duty and dependents (18 and over with a valid dependent ID card), Reserves, ROTC, National Guard, retired military, and Department of Defense civilians. All players must have a valid government identification card. Retired military personnel and retired Department of defense civilians are eligible to play with a team from the state where they retired or a team from the state of their permanent address. Only Contractors who have a DoD ID card or a common access card with a green color bar and computer chip (CAC) are eligible to participate. Persons who hold a Defense Biometric Identification System (DBIDS) are NOT eligible to participate in the Military program. ALL CARDS WITH AN EXPIRED DATE WILL NOT BE ALLOWED. </ul>
        <ul class="ion-padding">Sec. 6. For Men’s Teams participating in the Military World Tournament, Players may participate in only one (1) division of play Varsity “A”, Varsity “B”, or Intramural. TDY personnel are eligible to compete in the World Tournament if the TDY assignment is 6 months or more in duration. </ul>
        <ul class="ion-padding">Sec. 7. Men’s teams with players from two installations within 75 miles can play in men’s Varsity A or B Division. Men’s teams with players from more than two installations or more than 75 miles must play in the men’s Varsity A Division. Men’s teams in the Intramural Division must have players from only one installation/base. </ul>
        <ul class="ion-padding">
          A. Player Eligibility:
          <li class="ion-padding">1. Men’s Varsity A rosters must provide a valid CAC or DoD ID card to participate at this level.
            <ul class="ion-padding">a. Each team can only have a maximum of three (3) players on their roster who are on the Men’s Major Player List or Major Watch List. </ul>
            <ul class="ion-padding">b. Men’s Varsity A rosters are limited to eight (8) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and two (2) Contractors. c. Players with a USSSA PRV of Major – E are eligible to play in the Varsity A. Player with a USSSA PRV of B and above must play in the Varsity A Division (see Exception) * Exception – If a USSSA B player cannot find a Military Varsity A team to play with then they may be allowed to play on a Military Varsity B team with approval from the USSSA Military National Director (must still meet the Varsity B eligibility in Sec.7).</ul>
          </li>
          <li class="ion-padding">2. Men’s Varsity B rosters must provide the following documents: 
            <ul class="ion-padding">a. National Guard and reservists must provide documentation showing they are assigned to an armory and/or unit within 120 miles of the military installation or command they are competing for. Guard and reservists outside 120 miles must get the permission of the USSSA Military National Director.</ul>
            <ul class="ion-padding">b. Active duty reservists must provide a copy of PCS orders with Military ID at registration, which places them at current military installation, base, or command. </ul>
            <ul class="ion-padding">c. All other eligible players including retirees, DoD contractors (which must provide DoD Common Access Card with green bar) and dependents must show proof of ID and residency from the state/local region they are playing in to prove eligibility.</ul>      
            <ul class="ion-padding">d. Men’s Varsity B teams are limited to Six (6) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and two (2) Contractors. No Varsity B team can pick up a DD214 or Contractor who is on the Major Player List or Major Watch List. This does not include those members who meet the Eligibility rules in Sec.5.</ul>
            <ul class="ion-padding">e. Players with a USSSA PRV of C Elite – E are eligible to play in the Varsity B Division.</ul>
            <ul class="ion-padding">f. Players who competed on a Men’s Varsity B but have been transferred to a base which does not have a team may request a waiver from the USSSA National Military Program Director to play for their former team for a period of one year from the date of transfer.</ul>
            <ul class="ion-padding">g. Men’s teams that cannot provide player eligibility documents will be removed from the Varsity B program.</ul>
            <ul class="ion-padding">h. Any player receiving PCS orders within 45 days of the USSSA Military World Tournament can request an exception from the USSSA National Military Program Director.</ul>
          </li>
          <li class="ion-padding">3. Men’s Intramural rosters must provide the following documents:
            <ul class="ion-padding">a. National Guard and Reservists must provide documentation showing they are assigned to an armory and/or unit within 120 miles of the military installation or command they are competing for. Guard and reservists outside 120 miles must get the permission of the USSSA Military National Director.</ul>
            <ul class="ion-padding">b. All other eligible players including retirees and DoD contractors must show proof of ID and residency from the state/local region they are playing in to prove eligibility. Men’s Intramural teams are limited to Five (5) players who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and one (1) Contractor. No Intramural team can pick up a player who is on the Major Player List or Major Watch List.</ul>
            <ul class="ion-padding">c. Players with a USSSA PRV of D Elite - E are eligible to play in the Intramural Division.</ul>
            <ul class="ion-padding">d. Men’s teams that cannot provide player eligibility documents will be removed from the Men’s Intramural program.</ul>
            <ul class="ion-padding">e. Male players whose name appeared on any Military Varsity A Roster the current or previous year are not eligible to compete in the Men’s Intramural program. Any player who participated in only one (1) tournament with a registered Varsity A team in the current or previous season can seek a waiver to this rule from the USSSA National Military Program Director.</ul>
            <ul class="ion-padding">f. Any Player selected to the All Armed Forces Service team in the past 5 years is not eligible to participate in the Intramural program.</ul>
            <ul class="ion-padding">g. Any player receiving PCS orders within 45 days of the USSSA Military World Tournament can request an exception from the USSSA National Military Program Director.</ul>
          </li>
          <li class="ion-padding"> 4. Women’s Military rosters must provide a valid CAC or DoD ID card to participate at this level.
            <ul class="ion-padding">a. Women’s rosters are limited to Five (5) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and two (2) Contractors.</ul>
            <ul class="ion-padding">b. Each team can only have a maximum of three (3) players on their roster who are on the Women’s Major Player List or Major Watch List.</ul>
          </li>
          <li class="ion-padding">5. Over 40 program – Over 40 teams are limited to Five (5) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and Two (2) Contractor.</li>
          <li class="ion-padding">6. COED program – USSSA Mixed rules (Rule 13) apply to the Military COED program. Military Coed teams are limited to Five (5) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and Two (2) Contractor per gender.</li>
          <li class="ion-padding">7. Over 50 program – USSSA Policy & Procedures 0039 K for 50 and Over Comp rules apply to the Military Over 50 Program Teams in the Over 50 program are allowed to have Two (2) players who are 48 years of age and older.</li>
          <li class="ion-padding">8. Over 35 Women’s program – Over 35 teams are limited to Five (5) player(s) who possess a DD214 with an Honorable Discharge or General (Under Honorable Conditions) and Two (2) Contractor.</li>
          <li class="ion-padding">9. DD214 players must provide a valid Member 4 (original) or Member 2 copy of their DD214 with an Honorable or General (Under Honorable Conditions) Discharge at check-in. No exceptions. </li>
          <li class="ion-padding">10. Contractor and DD214 personnel minimum level of play eligibility will be based on their USSSA PRV or equivalent for other Sanctions if player is not on a USSSA roster.
            <ul class="ion-padding">a. USSSA B and Above – Must play Military Varsity A (see exception)</ul>
            <ul class="ion-padding">b. USSSA C – Can play Military Varsity A or Varsity B</ul>
            <ul class="ion-padding">c. USSSA D, E and E-Rec – Can play Military Varsity A, Varsity B or Intramural</ul>
            <ul class="ion-padding">* Exception – If a USSSA B player cannot find a Military Varsity A team to play with then they may be allowed to play on a Military Varsity B team with approval from the USSSA Military National Director.</ul>
          </li> 
        </ul>   
        <ul class="ion-padding">Sec. 8. Teams must play in at least one USSSA Military Tournament or participate in a USSSA sanctioned league to be eligible to advance to the Military World Tournament. A team that plays in a USSSA Major Event will count towards the required number of events to qualify for the Military World Tournament. A team that is unable to participate in a Military USSSA tournament prior to Military Worlds can request an exception by providing a written request to the USSSA National Military Director. </ul>
        <ul class="ion-padding">Sec. 9. Team Reclassification
          <li class="ion-padding">a. The top finishing team in the Men’s Military Varsity B and Intramural World tournaments will NOT automatically move up to the next higher classification the following year. The USSSA National Military Committee will make the decision on what teams will be reclassified after the completion of the World Tournament and has the authority to reclassify any team during the current season. Teams reclassified after the World Tournament will be notified prior to January 1 and teams reclassified during the season will be notified by August 1.</li>
        </ul>
        <ul class="ion-padding">Sec. 10. Courtesy Runner
          <li class="ion-padding">a. All Divisions of play will be required to use a Courtesy runner for the pitcher (no exceptions) and one additional courtesy runner per inning may be used. The courtesy runner for the pitcher can be any player on the roster, the additional courtesy runner can be any player on the roster. If the courtesy runner is still on base at the time of his/her at bat comes up, that spot in the batting order will be an out.</li>
        </ul>
        <ul class="ion-padding">Sec. 11. In the Military Program, a minimum of 9 Players can start a game. However, an out shall be declared when the 10th position in the lineup is scheduled to bat. A 10th player may be added in the 10th position any time before the end of a game. Any team that starts a game with 10, 11, or 12 players may drop to the minimum of 9 players to finish the game. All vacant spot(s) in the lineup will be declared an out every time that lineup position is due to bat. If a team starts with 9 or 10 players, they are not allowed to add the 11th or 12th player at a later time. Any player that leaves the game for any reason may not return to the game. (This does not apply to normal re-entry and substitution). Exception: A player, who has left the game under the Blood Rule, may return.
          <li class="ion-padding">Note: The defensive team may walk the preceding batter or multiple batters to get to the position or positions in the lineup that is an out due to having started with 9 players or having dropped to 9 or 10 players. There are no base appeals when this results in the third out of the inning.</li>
        </ul>
        <ul class="ion-padding">Run Rule and when to Flip/Flop
          <ion-grid class="ion-padding">
            <ion-row>
              <ion-col>All Divisions</ion-col>
              <ion-col>20 after 3</ion-col>
              <ion-col>After 2nd</ion-col>
            </ion-row>
            <ion-row>
              <ion-col />
              <ion-col>15 after 4</ion-col>
              <ion-col>After 3rd</ion-col>
            </ion-row>
            <ion-row>
              <ion-col />
              <ion-col>10 after 5</ion-col>
              <ion-col>After 4th</ion-col>
            </ion-row>
          </ion-grid>
        </ul>
        <ul class="ion-padding">Home Run Rule
          <ion-grid class="ion-padding">
            <ion-row>
              <ion-col>Military Varsity A</ion-col>
              <ion-col>12</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Military Varsity B</ion-col>
              <ion-col>6</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Military Intramural</ion-col>
              <ion-col>3</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Women’s</ion-col>
              <ion-col>Unlimited</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Over 40</ion-col>
              <ion-col>10</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Over 50</ion-col>
              <ion-col>5 then 1 Up</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Women’s Over 35</ion-col>
              <ion-col>Unlimited</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Coed</ion-col>
              <ion-col>6 for Men / 6 for Women</ion-col>
            </ion-row>
          </ion-grid>
        </ul>
        <ul class="ion-padding">Sec. 12. All playing rules not specifically covered in this rule section shall be governed by the other rules as outlined in Rules 1 through 10 of the USSSA Rule Book</ul>
      </ion-text>
    </ion-content>
  </ion-page>
</template>