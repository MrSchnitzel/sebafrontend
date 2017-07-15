'use strict';

import UserService from './../../services/user/user.service';

import template from './view-job.template.html';
import './view-job.style.css';
import JobService from './../../services/job/job.service';


class ViewAddJobComponent {
    constructor(){
        this.controller = ViewAddJobComponentController;
        this.template = template;
        this.bindings = {
        	job: '<',
		}
    }

    static get name() {
        return 'viewJob';
    }

}

class ViewAddJobComponentController{
    
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
        if (this.UserService.isAuthenticated()) {
            let _id = this.job['_id'];
            this.$state.go('jobs',{});
        } else {
            this.$state.go('login',{});
        }
	}
    edit () {
        if (this.UserService.isAuthenticated()) {
            let _id = this.job['_id'];
            this.$state.go('jobEdit',{ jobId:_id});
        } else {
            this.$state.go('login',{});
        }
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


export default ViewAddJobComponent;