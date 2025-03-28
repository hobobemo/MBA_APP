<template>
    <div class="astrodivider neonpurple">
        <div class="astrodividermask"></div><span><i>&#x2605;</i></span>
    </div>
</template>

<style>
.astrodivider {
  margin: 32px auto;
  width: 100vw;
  max-width: 100%;
  position: relative;
}

.astrodividermask {
  overflow: hidden;
  height: 20px;
}

.astrodividermask:after {
  content: "";
  display: block;
  margin: -25px auto 0;
  width: 100%;
  height: 25px;
  border-radius: 125px / 12px;
  box-shadow: 0 0 8px var(--ion-color-primary);
}

.astrodivider span {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 100%;
  margin-bottom: -25px;
  left: 50%;
  margin-left: -25px;
  border-radius: 100%;
  box-shadow: 0 2px 4px var(--ion-color-secondary); /* Tint 3 of main color */
  background: #fff;
}

.astrodivider i {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  right: 4px;
  border-radius: 100%;
  border: 1px dashed var(--ion-color-secondary); /* Tint 4 of main color */
  text-align: center;
  line-height: 40px;
  font-style: normal;
  color: #049372; /* main color */
}

/* Neon Purple */

.neonpurple .astrodividermask:after {
  box-shadow: 0 0 8px var(--ion-color-primary); /* main color */
}
.astrodivider.neonpurple span {
  box-shadow: 0 2px 4px var(--ion-color-primary); /* tint 3 of main color */
}
.astrodivider.neonpurple i {
  border: 1px dashed var(--ion-color-secondary); /* tine 4 of main color */
  color: var(--ion-color-primary); /* main color */
}

</style>