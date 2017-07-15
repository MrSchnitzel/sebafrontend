'use strict';

import UserService from './../../services/user/user.service';

import template from './view-jobs.template.html';
import './view-jobs.style.css';
import JobService from './../../services/job/job.service';


class ViewJobsComponent {
    constructor(){
        this.controller = ViewJobsComponentController;
        this.template = template;
        this.bindings = {
        	jobs: '<',
		}
    }

    static get name() {
        return 'viewJobs';
    }

}

class ViewJobsComponentController{
    
	constructor ($state ,UserService, JobService) {
        this.UserService = UserService;
	    this.JobService = JobService;
		this.$state = $state;
	}

  	removeSkill (selectedItem) {
		let index = this.job.skills.indexOf(selectedItem);
		this.job.skills.splice(index, 1);
  	}

	addSkill () {
		this.job.skills.push({
			type: this.skill.type,
			power: this.skill.power,
		});
		this.skill = {};
        this.skill.power = 1;
	}

    back () {
		this.$state.go('job');
	}

	$onInit(){
		this.job = JSON.parse(JSON.stringify(this.job))

		/*let currentDate = new Date();
		this.maxStartDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 1,
			currentDate.getDate()
		);
		this.maxEndDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate()
		);*/
	}
	
    static get $inject () {
      return ['$state',UserService.name, JobService.name];
    }

}


export default ViewJobsComponent;